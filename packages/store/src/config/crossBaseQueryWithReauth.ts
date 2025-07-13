import { ERROR_KEYS } from "@amen24/shared";
import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { isNetworkError } from "../utils/isNetworkError";

// To prevent multiple refreshes
const mutex = new Mutex();

export interface Options {
  useBearerToken?: boolean;
  getAccessToken?: () => Promise<string | null>;
  getRefreshToken?: () => Promise<string | null>;
  onAuthEvent?: (event: {
    type: "login" | "refresh" | "logout" | "failure";
    tokens?: {
      accessToken: string;
      refreshToken: string;
    };
  }) => void;
  onError?: (type: "network" | "unauthorized" | "unknown", error?: unknown) => void;
}

interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}

export const createBaseQueryWithReauth = (
  baseUrl: string,
  segment: string,
  options?: Options,
): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl,
    credentials: options?.useBearerToken ? undefined : "include",
    prepareHeaders: async (headers) => {
      if (options?.useBearerToken && options.getAccessToken) {
        const token = await options.getAccessToken();
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }
      return headers;
    },
  });

  // 🔑 Create a second base query with no headers setup
  const baseQueryWithoutAuth = fetchBaseQuery({
    baseUrl,
    credentials: options?.useBearerToken ? undefined : "include",
  });

  return async (args, api, extraOptions) => {
    // Prefix URL with segment if needed
    if (typeof args === "string") {
      args = `/${segment}${args.startsWith("/") ? args : `/${args}`}`;
    } else if (
      "url" in args &&
      !args.url.startsWith("http") &&
      !args.url.startsWith("/auth")
    ) {
      args = {
        ...args,
        url: `/${segment}${args.url.startsWith("/") ? args.url : `/${args.url}`}`,
      };
    }

    let result = await rawBaseQuery(args, api, extraOptions);

    if (isNetworkError(result.error)) {
      console.warn("🚫 No internet connection");

      options?.onError?.("network", result.error);
      return result;
    }

    // Reauth flow
    if (
      result.error?.status === 401 &&
      ((result.error.data as { message?: string })?.message ===
        ERROR_KEYS.SESSION_NOT_EXIST ||
        (result.error.data as { message?: string })?.message ===
        ERROR_KEYS.SESSION_EXPIRED)
    ) {
      console.log("[Reauth] Token expired or session missing");

      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        try {
          const refreshResult = await baseQueryWithoutAuth(
            {
              url: "/auth/refresh?mobile=true",
              method: "POST",
              headers: {
                Authorization: `Bearer ${await options.getRefreshToken?.()}`,
              },
            },
            api,
            extraOptions,
          );

          if (!refreshResult.error) {
            console.log("[Reauth] Retrying original request after refresh...");
            result = await rawBaseQuery(args, api, extraOptions);

            if (refreshResult.data) {
              const { accessToken, refreshToken } = refreshResult.data as TokenResponse;

              options?.onAuthEvent?.({
                type: "refresh",
                tokens: { accessToken, refreshToken },
              });
            }
          } else {
            console.warn("[Reauth] Refresh failed");
            options?.onAuthEvent({ type: "failure" });
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
