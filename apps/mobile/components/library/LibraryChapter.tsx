import React, { FC, useLayoutEffect } from "react";
import { ThemedText } from "../ui/ThemedText";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { StyleSheet, Text, useColorScheme } from "react-native";
import { Colors } from "@/constants";
import { useGetLibraryBookQuery } from "@/store/apis/libraryApi";
import { ThemedView } from "../ui/ThemedView";
import Marked from "react-native-marked";
import { MarkdownContent } from "../ui/MarkdownContent";

type SearchParams = {
  slug: string;
  current: string;
};

const LibraryChapter: FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const params = useLocalSearchParams<SearchParams>();
  const { slug, current } = params;
  const { data: libBook } = useGetLibraryBookQuery(slug);
  const currentChapter = libBook?.chapters.find((ch) => ch.id === current);

  useLayoutEffect(() => {
    if (currentChapter?.title) {
      navigation.setOptions({
        title: <Text style={{ color: theme.primary }}>{libBook?.title}</Text>,
        // headerRight: () => <LibraryChapterSelector title={currentChapter?.title} />
      });
    }
  }, [currentChapter?.title, colorScheme, libBook?.title]);

  return (
    <ThemedView style={[styles.container]}>
      <ThemedText type="title" style={styles.chapterTitle}>
        {currentChapter?.title}
      </ThemedText>
      <MarkdownContent markdown={currentChapter?.content || ""} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  chapterTitle: {
    marginTop: 12,
    marginBottom: 12,
    textAlign: "center",
  },
});

export default LibraryChapter;
