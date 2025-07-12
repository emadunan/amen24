import { apiUrl } from "@/constants";
import { setTokens } from "@/lib/auth";
import { createFavoriteApi } from "@amen24/store";
import * as SecureStore from "expo-secure-store";
import { authApi } from "./authApi";
import { getStore } from "../storeRef";

if (!apiUrl) throw new Error("Api url must be defined!");

export const favoriteApi = createFavoriteApi(apiUrl, {
  useBearerToken: true,
  getAccessToken: () => SecureStore.getItemAsync("accessToken"),
  getRefreshToken: () => SecureStore.getItemAsync("refreshToken"),
  onAuthEvent: async ({ type, tokens }) => {
    const store = getStore();

    switch (type) {
      case "refresh":
      case "login":
        if (tokens) {
          setTokens(tokens.accessToken, tokens.refreshToken)
        }
        store.dispatch(authApi.util.invalidateTags(["User"]));
        store.dispatch(favoriteApi.util.invalidateTags(["Favorite"]));
        break;

      case "failure":
        console.warn("❌ Mobile token expired or invalid");
        // Optionally redirect to login screen or show alert
        break;
    }
  }
});

export const {
  useGetUserFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
} = favoriteApi;
