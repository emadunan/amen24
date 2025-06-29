import { Stack } from "expo-router";
import React from "react";

const BibleLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "" }} />
      <Stack.Screen name="[bookKey]" />
    </Stack>
  );
};

export default BibleLayout;
