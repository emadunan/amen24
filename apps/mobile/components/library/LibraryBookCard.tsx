import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "@/constants";
import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";

interface Props {
  slug: string;
  title: string;
  author?: string;
  current: string;
}

const LibraryBookCard: React.FC<Props> = ({ slug, title, author, current }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  return (
    <TouchableOpacity
      onPress={() => router.push(`/library/${slug}?current=${current}`)}
    >
      <ThemedView
        style={[
          styles.card,
          {
            backgroundColor: theme.secondary,
            borderColor: theme.primary,
            borderWidth: 1,
          },
        ]}
      >
        <ThemedText style={styles.title}>{title}</ThemedText>
        {author && (
          <ThemedText style={[styles.author, { color: theme.gray }]}>
            {author}
          </ThemedText>
        )}
      </ThemedView>
    </TouchableOpacity>
  );
};

export default LibraryBookCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderRadius: 2,
  },
  title: {
    fontSize: 22,
  },
  author: {
    fontSize: 14,
  },
});
