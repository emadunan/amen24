import { ApiMessage, Featured, FeaturedText } from "@amen24/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const featuredApi = createApi({
  reducerPath: "featuredApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/featured`,
    credentials: "include",
  }),
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
