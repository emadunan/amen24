import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { LibraryChapter } from "@amen24/shared";

interface Props {
  slug: string;
  current: string;
  chapter: LibraryChapter;
  navigation: DrawerNavigationHelpers;
}

const LibraryChapterLink: FC<Props> = ({
  slug,
  current,
  chapter,
  navigation,
}) => {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const chapterTextTheme = {
    color: Colors[colorScheme ?? "light"].primary,
  };

  const selectedChapterItemTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].primary,
  };

  const selectedChapterTextTheme = {
    color: Colors[colorScheme ?? "light"].background,
  };

  const selected = chapter.id === current;

  function handlePress() {
    navigation.closeDrawer();
    router.push(`/(tabs)/library/${slug}?current=${chapter.id}`);
  }

  return (
    <ThemedView
      style={[styles.chapterItem, selected && selectedChapterItemTheme]}
    >
      <Pressable onPress={handlePress}>
        <ThemedText
          style={[
            styles.chapterText,
            chapterTextTheme,
            selected && selectedChapterTextTheme,
          ]}
        >
          {`${chapter.title}`}
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  chapterItem: {
    padding: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  chapterText: {
    fontSize: 16,
    fontWeight: "500",
  },
  pressedItem: {
    backgroundColor: "#ffe4b2", // Slightly darker cream on press
  },
});

export default LibraryChapterLink;
