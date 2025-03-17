import { User, UserProfile } from "@amen24/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/users`,
    credentials: "include",
  }),
  tagTypes: ["User"], // 👈 Define User tag type
  endpoints: (builder) => ({
    getMe: builder.query<UserProfile | null, void>({
      query: () => "/me",
      providesTags: ["User"],
    }),
    signup: builder.mutation<void, Partial<User>>({
      query: (user) => ({
        url: "/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
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
        url: "/me/theme",
        method: "PATCH",
      }),
      invalidatesTags: ["User"],
    }),
    changeLang: builder.mutation<void, string>({
      query: (lang) => ({
        url: "/me/lang",
        method: "PATCH",
        body: { lang },
      }),
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: "profile",
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useToggleThemeMutation,
  useChangeLangMutation,
  useDeleteAccountMutation,
} = userApi;
