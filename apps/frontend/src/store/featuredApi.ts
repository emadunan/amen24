import { ApiMessage, Featured, FeaturedText } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

export const featuredApi = createApi({
  reducerPath: "featuredApi",
  baseQuery: createBaseQueryWithReauth("featured"),
  tagTypes: ["Featured"],
  endpoints: (builder) => ({
    getAllFeatured: builder.query<Featured[], void>({
      query: () => "",
      providesTags: ["Featured"],
    }),
    getFeaturedText: builder.query<FeaturedText[], void>({
      query: () => "",
      providesTags: () => ["Featured"],
    }),
    addToFeatured: builder.mutation<Featured, number[]>({
      query: (verseIds) => ({
        url: "",
        method: "POST",
        body: { verseIds },
      }),
      invalidatesTags: ["Featured"],
    }),
    removeFromFeatured: builder.mutation<ApiMessage, number>({
      query: (featuredId) => ({
        url: `${featuredId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Featured"],
    }),
  }),
});

export const {
  useGetAllFeaturedQuery,
  useGetFeaturedTextQuery,
  useAddToFeaturedMutation,
  useRemoveFromFeaturedMutation,
} = featuredApi;
