import { ApiMessage, Featured, FeaturedText } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

export const createFeaturedApi = (baseUrl: string) => createApi({
  reducerPath: "featuredApi",
  baseQuery: createBaseQueryWithReauth(baseUrl, "featured"),
  tagTypes: ["Featured"],
  endpoints: (builder) => ({
    getAllFeatured: builder.query<Featured[], void>({
      query: () => "",
      providesTags: ["Featured"],
    }),
    addToFeatured: builder.mutation<Featured, number[]>({
      query: (verseIds) => ({
        url: "",
        method: "POST",
        body: { verseIds },
      }),
      invalidatesTags: ["Featured"],
    }),
    updateFeatured: builder.mutation<Featured, Partial<Featured>>({
      query: ({ id, position }) => ({
        url: `${id}`,
        method: "PATCH",
        body: {
          position
        },
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
    getFeaturedText: builder.query<FeaturedText[], string>({
      query: (featuredId) => `${featuredId}`,
      providesTags: () => ["Featured"],
    }),
    updateFeaturedText: builder.mutation<void, { id: number, text: string }>({
      query: (body) => ({
        url: "text",
        method: "PATCH",
        body
      }),
      invalidatesTags: ["Featured"]
    }),
  }),
});

