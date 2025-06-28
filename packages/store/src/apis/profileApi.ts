import { ApiMessage, Profile, ProfileStatistics } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../config/baseQueryWithReauth";

export const createProfileApi = (baseUrl: string) =>
  createApi({
    reducerPath: "profileApi",
    baseQuery: createBaseQueryWithReauth(baseUrl, "profiles"),
    tagTypes: ["Profile"],
    endpoints: (builder) => ({
      updateProfile: builder.mutation<void, Partial<Profile>>({
        query: (body) => {
          return {
            url: "me",
            method: "PUT",
            body,
          };
        },
        invalidatesTags: ["Profile"],
      }),
      updateUserProfile: builder.mutation<void, Partial<Profile>>({
        query: (body) => {
          return {
            url: "",
            method: "PUT",
            body,
          };
        },
        invalidatesTags: ["Profile"],
      }),
      deleteAccount: builder.mutation<ApiMessage, void>({
        query: () => ({
          url: "",
          method: "DELETE",
        }),
        invalidatesTags: ["Profile"],
      }),
      getProfileStatistics: builder.query<ProfileStatistics, void>({
        query: () => "statistics",
      }),
      getProfiles: builder.query<Profile[], void>({
        query: () => "",
        providesTags: ["Profile"],
      }),
    }),
  });
