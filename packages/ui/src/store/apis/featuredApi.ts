import {
  ApiMessage,
  Featured,
  FeaturedPosition,
  FeaturedText,
  Lang,
} from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "../baseQueryWithReauth";

export const createFeaturedApi = (baseUrl: string) =>
  createApi({
    reducerPath: "featuredApi",
    baseQuery: createBaseQueryWithReauth(baseUrl, "featured"),
    tagTypes: ["Featured"],
    endpoints: (builder) => ({
      getAllFeatured: builder.query<
        Featured[],
        { lang: Lang; position?: FeaturedPosition }
      >({
        query: ({ lang, position }) => {
          const searchParams = new URLSearchParams();

          if (lang) searchParams.append("lang", lang);
          if (position) searchParams.append("position", position);

          const queryString = searchParams.toString();
          return queryString ? `?${queryString}` : "";
        },
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
            position,
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
      updateFeaturedText: builder.mutation<void, { id: number; text: string }>({
        query: (body) => ({
          url: "text",
          method: "PATCH",
          body,
        }),
        invalidatesTags: ["Featured"],
      }),
    }),
  });
