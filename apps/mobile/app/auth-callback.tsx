import { useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { setTokens } from "@/lib/auth";

export default function AuthCallbackScreen() {
  const { accessToken, refreshToken } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (accessToken && refreshToken) {
      setTokens(accessToken as string, refreshToken as string);

      router.replace("/bible");
    }
  }, []);

  return null;
}
