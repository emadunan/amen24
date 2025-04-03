import { Lang, User } from "@amen24/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

type UserLogin = Pick<User, "email" | "password">;

type UserSignup = Partial<User> & {
  uiLang: Lang;
  bookmark: {
    last_read: string;
    old_testament?: string;
    new_testament?: string;
  };
};

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/users`,
    credentials: "include",
  }),
  tagTypes: ["User"], // 👈 Define User tag type
  endpoints: (builder) => ({
    getMe: builder.query<User | null, void>({
      query: () => "/me",
      providesTags: ["User"],
    }),
    signup: builder.mutation<{ message: string }, UserSignup>({
      query: (user) => ({
        url: "/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<void, UserLogin>({
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
    resetPassword: builder.mutation<
      { message: string },
      { oldPassword: string; newPassword: string }
    >({
      query: (body) => ({
        url: "/me/password-reset",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    requestPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/password-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    restorePassword: builder.mutation<
      { message: string },
      { newPassword: string; token: string }
    >({
      query: (body) => ({
        url: "/me/password-restore",
        method: "PATCH",
        body,
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
      query: (uiLang) => ({
        url: "/me/lang",
        method: "PATCH",
        body: { uiLang },
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
  useResetPasswordMutation,
  useRequestPasswordMutation,
  useRestorePasswordMutation,
} = userApi;
