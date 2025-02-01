import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useRouter } from "expo-router";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
  chapter: any;
  bookKey: string;
  bookId: string;
  bookLen: string;
  currentChapter: string;
  navigation: any;
}

const ChapterLink: FC<Props> = ({
  chapter,
  currentChapter,
  bookId,
  bookKey,
  bookLen,
  navigation,
}) => {
  const { t } = useTranslation();

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

  const pressedItemTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };

  const selected = chapter.toString() === currentChapter;

  function handlePress() {
    navigation.closeDrawer();
    router.push(
      `/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${chapter}`,
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      key={chapter}
      style={({ pressed }) => [
        styles.chapterItem,
        selected && selectedChapterItemTheme,
        pressed && pressedItemTheme,
      ]}
    >
      <Text
        style={[
          styles.chapterText,
          chapterTextTheme,
          selected && selectedChapterTextTheme,
        ]}
      >
        {`${t("chapter")} ${chapter}`}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chapterItem: {
    padding: 8,
    paddingLeft: 16,
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
