import { apiUrl } from "@/constants";
import { createProgressApi } from "@amen24/store";
import * as SecureStore from "expo-secure-store";

if (!apiUrl) throw new Error("Api url must be defined!");

export const progressApi = createProgressApi(apiUrl, {
  useBearerToken: true,
  getToken: () => SecureStore.getItemAsync("accessToken"),
  onAuthFailure: () => {
    console.warn("❌ Mobile token expired or invalid");
    // Optionally: dispatch logout, redirect, etc.
  }
});

export const { useGetUserLastReadProgressQuery, useUpdateProgressMutation } =
  progressApi;
