import { ApiMessage, Lang, Profile, ProfileStatistics, User, UserRole } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

type UserSignup = Partial<User> & {
  uiLang: Lang;
  roles: UserRole[],
  progress: {
    lastRead: string;
    oldTestament?: string;
    newTestament?: string;
  };
};

export const createUserApi = (baseUrl: string) => createApi({
  reducerPath: "userApi",
  baseQuery: createBaseQueryWithReauth(baseUrl, "users"),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    signup: builder.mutation<{ message: string }, UserSignup>({
      query: (user) => ({
        url: "/",
        method: "POST",
        body: user,
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
