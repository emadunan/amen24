import { ThemedText } from "@/components/ThemedText";
import { Stack } from "expo-router";
import React from "react";

const GlossaryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="[slug]" options={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          
        }
      }} />
    </Stack>
  );
};

export default GlossaryLayout;
