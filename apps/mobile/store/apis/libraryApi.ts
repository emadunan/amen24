import { apiUrl } from "@/constants";
import { createLibraryApi } from "@amen24/store";
import * as SecureStore from "expo-secure-store";
import { setTokens } from "@/lib/auth";
import { getStore } from "../storeRef";
import { authApi } from "./authApi";

if (!apiUrl) throw new Error("Api url must be defined!");

export const libraryApi = createLibraryApi(apiUrl, {
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
        store.dispatch(libraryApi.util.invalidateTags(["LibraryBook"]));
        break;

      case "failure":
        console.warn("❌ Mobile token expired or invalid");
        // Optionally redirect to login screen or show alert
        break;
    }
  }
});

export const {
  useGetLibraryBookQuery,
  useGetLibraryBooksQuery,
  useGetLibraryChapterQuery,
} = libraryApi;
