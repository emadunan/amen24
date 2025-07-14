import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

type Props = {
  markdown: string;
};

export const MarkdownContent: React.FC<Props> = ({ markdown }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Markdown
          style={{
            body: {
              color: theme.text,
              fontFamily: "AmiriRegular",
              fontSize: 18,
            },
            heading1: {
              fontFamily: "AmiriBold",
              color: theme.primary,
              fontSize: 24,
            },
            heading2: {
              fontFamily: "AmiriBold",
              color: theme.primary,
              fontSize: 22,
            },
            heading3: {
              fontFamily: "AmiriBold",
              color: theme.primary,
              fontSize: 20,
            },
            // Optional: adjust paragraph, strong, em, list, etc.
          }}
        >
          {markdown}
        </Markdown>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 64
  },
});
