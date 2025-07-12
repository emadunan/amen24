import React from "react";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import { ActivityIndicator, useColorScheme } from "react-native";
import { Colors } from "@/constants";

interface Props {
  size?: "small" | "large";
  message?: string,
}

const LoadingIndicator: React.FC<Props> = ({ size = "large", message }) => {
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  return (
    <ThemedView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <ActivityIndicator size={size} color={theme.accent} />
      {message && <ThemedText style={{ marginTop: 12 }}>{message}</ThemedText>}
    </ThemedView>
  )
};

export default LoadingIndicator;