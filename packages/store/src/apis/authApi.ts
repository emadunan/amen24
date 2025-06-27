// Need to use the React-specific entry point to import createApi
import { User } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../crossBaseQueryWithReauth";

type UserLogin = Pick<User, "email" | "password">;

export type Options = {
  useBearerToken?: boolean;
  getToken?: () => Promise<string | null>;
  onAuthFailure?: () => void;
};

export const createAuthApi = (baseUrl: string, options?: Options) =>
  createApi({
    reducerPath: "authApi",
    tagTypes: ["User"],
    baseQuery: createBaseQueryWithReauth(baseUrl, "auth", options),
    endpoints: (builder) => ({
      getMe: builder.query<User | null, void>({
        query: () => {
          console.log("Endpoint called /me");
          console.log("BaseURL: ", baseUrl);

          return `/me`;
        },
        providesTags: ["User"],
      }),
      login: builder.mutation<void, UserLogin>({
        query(body) {
          return {
            url: `/local`,
            method: "POST",
            body,
          };
        },
        invalidatesTags: ["User"],
      }),
    }),
  });
