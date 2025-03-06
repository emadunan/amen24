import { UserProfile } from "@amen24/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/users",
    credentials: "include",
  }),
  tagTypes: ["User", "Theme"], // 👈 Define User tag type
  endpoints: (builder) => ({
    getMe: builder.query<UserProfile | null, void>({
      query: () => "/me",
      providesTags: ["User", "Theme"],
    }),
    login: builder.mutation<void, { email: string; password: string }>({
      query: (credentials) => ({
        url: "/local-login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation<void, void>({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
    toggleTheme: builder.mutation<void, void>({
      query: () => ({
        url: "/theme",
        method: "PATCH",
      }),
      invalidatesTags: ["Theme"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useToggleThemeMutation,
  useGetMeQuery,
} = userApi;
