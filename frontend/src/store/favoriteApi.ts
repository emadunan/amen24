import { ApiMessage, Favorite } from "@amen24/shared";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${apiUrl}/users/favorite`,
    credentials: "include",
  }),
  tagTypes: ["Favorite"],
  endpoints: (builder) => ({
    getUserFavorites: builder.query<Favorite[], void>({
      query: () => "",
      providesTags: ["Favorite"],
    }),
    addFavorite: builder.mutation<Favorite, number[]>({
      query: (verseIds) => ({
        url: "",
        method: "POST",
        body: { verseIds },
      }),
      invalidatesTags: ["Favorite"],
    }),
    removeFavorite: builder.mutation<ApiMessage, number>({
      query: (favoriteId: number) => ({
        url: `${favoriteId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Favorite"],
    }),
  }),
});

export const {
  useGetUserFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;
