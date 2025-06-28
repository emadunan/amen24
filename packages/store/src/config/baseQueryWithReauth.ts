import { ERROR_KEYS } from "@amen24/shared";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const createBaseQueryWithReauth = (
  baseUrl: string,
  segment: string,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
  });

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
      console.log("[Reauth] Token expired or session missing");

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
            console.log("[Reauth] Retrying original request after refresh...");
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            console.warn("[Reauth] Refresh failed");
            // Optionally: api.dispatch(logout());
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
