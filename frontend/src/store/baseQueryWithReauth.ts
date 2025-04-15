import {
  fetchBaseQuery,
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";

const mutex = new Mutex();

export const createBaseQueryWithReauth = (segment: string) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/${segment}`;
  const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`;

  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: "include",
  });

  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    // if token expired
    if (result.error?.status === 401) {
      // avoid multiple refreshes
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await rawBaseQuery(
            { url: refreshUrl, method: "POST" },
            api,
            extraOptions
          );

          if (refreshResult.data) {
            // ✅ retry original query or mutation
            result = await rawBaseQuery(args, api, extraOptions);
          } else {
            // ❌ refresh failed: user must re-auth
            return refreshResult;
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

  return baseQueryWithReauth;
};
