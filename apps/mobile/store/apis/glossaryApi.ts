import { apiUrl } from "@/constants";
import { setTokens } from "@/lib/auth";
import { createGlossaryApi } from "@amen24/store";
import * as SecureStore from "expo-secure-store";

if (!apiUrl) throw new Error("Api url must be defined!");

export const glossaryApi = createGlossaryApi(apiUrl, {
  useBearerToken: true,
  getAccessToken: () => SecureStore.getItemAsync("accessToken"),
  getRefreshToken: () => SecureStore.getItemAsync("refreshToken"),
  setTokens,
  onAuthFailure: () => {
    console.warn("❌ Mobile token expired or invalid");
    // Optionally: dispatch logout, redirect, etc.
  },
});

export const {
  useAddTermMutation,
  useIsTermExistQuery,
  useGetAllTermsQuery,
  useGetOneTermQuery,
} = glossaryApi;
