import { ApiMessage, Favorite } from "@amen24/shared";
import { createApi } from "@reduxjs/toolkit/query/react";
import { createBaseQueryWithReauth } from "./baseQueryWithReauth";

export const favoriteApi = createApi({
  reducerPath: "favoriteApi",
  baseQuery: createBaseQueryWithReauth("users/favorite"),
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
