import { apiPublicUrl } from "@/constants";
import { createFavoriteApi } from "@amen24/ui";

if (!apiPublicUrl) throw new Error("Api url must be defined!");

export const favoriteApi = createFavoriteApi(apiPublicUrl);

export const {
  useGetUserFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;
