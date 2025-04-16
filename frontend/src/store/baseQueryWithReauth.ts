// lib/baseQueryWithReauth.ts
import { ERROR_KEYS } from "@amen24/shared";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

const rawBaseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

export const createBaseQueryWithReauth = (
  segment: string,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  return async (args, api, extraOptions) => {
    // Prefix the URL with the segment, unless it's an absolute URL (like refresh)
    if (typeof args === "string") {
      args = `/${segment}${args.startsWith("/") ? args : `/${args}`}`;
    } else if (typeof args === "object" && "url" in args) {
      if (!args.url.startsWith("http") && !args.url.startsWith("/auth")) {
        args = {
          ...args,
          url: `/${segment}${args.url.startsWith("/") ? args.url : `/${args.url}`}`,
        };
      }
    }

    let result = await rawBaseQuery(args, api, extraOptions);

    if (
      result.error?.status === 401 &&
      ((result.error.data as { message?: string })?.message ===
        ERROR_KEYS.SESSION_NOT_EXIST ||
        (result.error.data as { message?: string })?.message ===
          ERROR_KEYS.SESSION_EXPIRED)
    ) {
      console.log(result.error);

      // Wait until no one else is refreshing
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await rawBaseQuery(
            { url: "/auth/refresh", method: "POST" },
            api,
            extraOptions,
          );
          if (!refreshResult.error) {
            // Retry the original request
            // Check if access_token exists now (optional, for debugging)
            console.log("Retrying original request after refresh...");
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            // Refresh failed, logout the user if needed
            // Optionally dispatch logout here
          }
        } finally {
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await rawBaseQuery(args, api, extraOptions);
      }
    }

    return result;
  };
};
