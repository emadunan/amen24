import React from "react";
import AppLoadingScreen from "./AppLoadingScreen";
import { useGetMeQuery } from "@/store/apis/authApi";

export default function AuthBootstrap({ children }: { children: React.ReactNode }) {
  const { isLoading } = useGetMeQuery();

  if (isLoading) return <AppLoadingScreen />;

  return <>{children}</>;
}
