import { ApiMessage, Lang, Profile, User } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

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
  baseQuery: createBaseQueryWithReauth("users"),
  tagTypes: ["User"], // 👈 Define User tag type
  endpoints: (builder) => ({
    signup: builder.mutation<{ message: string }, UserSignup>({
      query: (user) => ({
        url: "/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["User"],
    }),
    updateProfile: builder.mutation<void, Partial<Profile>>({
      query: (body) => {
        return {
          url: "/me/profile",
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["User"],
    }),
    deleteAccount: builder.mutation<ApiMessage, void>({
      query: () => ({
        url: "profile",
        method: "DELETE",
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
    requestPassword: builder.mutation<{ message: string }, { email: string }>({
      query: (body) => ({
        url: "/password-request",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSignupMutation,
  useUpdateProfileMutation,
  useDeleteAccountMutation,
  useResetPasswordMutation,
  useRequestPasswordMutation,
  useRestorePasswordMutation,
} = userApi;
