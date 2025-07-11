import { apiUrl } from "@/constants";
import { logout, setTokens } from "@/lib/auth";
import { createAuthApi } from "@amen24/store";
import * as SecureStore from "expo-secure-store";
import { getStore } from "../storeRef";

if (!apiUrl) throw new Error("Api url must be defined!");

export const authApi = createAuthApi(apiUrl, {
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
        break;

      case "logout":
        await logout();
        store.dispatch(authApi.util.resetApiState());
        break;

      case "failure":
        console.warn("❌ Mobile token expired or invalid");
        // Optionally redirect to login screen or show alert
        break;
    }
  }
});
export const { useGetMeQuery, useLazyGetMeQuery, useLoginMutation } = authApi;
