import { Stack } from "expo-router";
import React from "react";

const LibraryLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="[slug]" options={{
        headerTitleAlign: "center",
      }} />
    </Stack>
  );
};

export default LibraryLayout;
