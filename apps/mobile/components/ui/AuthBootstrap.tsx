import React, { useEffect } from "react";
import AppLoadingScreen from "./AppLoadingScreen";
import { useGetMeQuery } from "@/store/apis/authApi";
import { useRouter, usePathname } from "expo-router";

export default function AuthBootstrap({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, isSuccess } = useGetMeQuery();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isSuccess) {
      // Refresh UI by replacing current route with itself
      router.replace("/(tabs)/bible");
    }
  }, [isSuccess]);

  if (isLoading) return <AppLoadingScreen />;

  return <>{children}</>;
}
