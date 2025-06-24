// app/auth-callback.tsx
import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { saveTokens } from "@/lib/auth";

export default function AuthCallbackScreen() {
  const { accessToken, refreshToken } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
  if (accessToken && refreshToken) {
    console.log("✅ Received tokens via deep link:");
    console.log(accessToken, refreshToken);

    saveTokens(accessToken as string, refreshToken as string);

    router.replace("/bible");
  }
}, []);


  return null;
}
