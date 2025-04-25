// Need to use the React-specific entry point to import createApi
import { User } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

type UserLogin = Pick<User, "email" | "password">;

export const authApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["User"],
  baseQuery: createBaseQueryWithReauth("auth"),
  endpoints: (builder) => ({
    getMe: builder.query<User | null, void>({
      query: () => `/me`,
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

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetMeQuery, useLoginMutation } = authApi;
