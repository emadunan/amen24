import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
  chapter: any;
  bookKey: string;
  bookId: string;
  bookLen: string;
  currentChapter: string;
  navigation: DrawerNavigationHelpers;
}

const ChapterLink: FC<Props> = ({
  chapter,
  currentChapter,
  bookId,
  bookKey,
  bookLen,
  navigation,
}) => {
  const { t, i18n } = useTranslation();

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

  const selected = chapter.toString() === currentChapter;

  function handlePress() {
    navigation.closeDrawer();
    router.push(
      `/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${chapter}`,
    );
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
          {`${t("chapter.title")} ${i18n.language === "ar" ? Number(chapter).toLocaleString("ar-EG") : chapter}`}
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

export default ChapterLink;
