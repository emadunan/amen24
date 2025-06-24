import { apiUrl } from "@/constants";
import { createAuthApi } from "@amen24/ui";
import * as SecureStore from "expo-secure-store";

if (!apiUrl) throw new Error("Api url must be defined!");

export const authApi = createAuthApi(apiUrl, {
  useBearerToken: true,
  getToken: () => SecureStore.getItemAsync("accessToken"),
  onAuthFailure: () => {
    console.warn("❌ Mobile token expired or invalid");
    // Optionally: dispatch logout, redirect, etc.
  },
});
export const { useGetMeQuery, useLazyGetMeQuery, useLoginMutation } = authApi;
