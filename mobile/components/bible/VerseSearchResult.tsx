import { IVerse } from "@/interfaces/verse";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Props {
  v: IVerse;
  queryLang: string;
  query: string;
}

const VerseSearchResult: FC<Props> = ({ v, queryLang, query }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const words = query.trim().split(/\s+/);

  const isRtlQuery: boolean = queryLang === "ar";

  const rtlStyles = {
    direction: "rtl" as "rtl" | "ltr",
  };

  const colorScheme = useColorScheme();

  const highlightedTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].highlight,
  };

  function handleDirectToChapter() {
    router.push(
      `/(tabs)/bible/${v.bookKey}?bookId=${v.bookId}&bookLen=${v.bookLen}&chapterNum=${v.chapterNum}&verseNum=${v.verseNum}`,
    );
  }

  const highlightText = (text: string) => {
    if (!query) return text; // If there's no query, return the text as is

    // Escape special regex characters in the query words
    const escapedWords = words.map((word) =>
      word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"),
    );

    // Create a regex pattern to match any of the words in the array
    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");

    // Split the text into words and spaces, keeping track of spaces
    const parts = text.split(/(\s+)/); // Split by spaces but keep the spaces in the array

    // Process each part and wrap matching words in a highlight style
    return parts.map((part, index) => {
      if (regex.test(part)) {
        // If it's a word that matches the query, highlight it
        return (
          <Text key={index} style={[styles.highlighted, highlightedTheme]}>
            {part}
          </Text>
        );
      } else {
        // Otherwise, it's just normal text, return it as-is
        return <Text key={index}>{part}</Text>;
      }
    });
  };

  return (
    <ThemedView
      key={v.id}
      style={[styles.verseContainer, isRtlQuery && rtlStyles]}
    >
      <ThemedText style={styles.verseText}>{highlightText(v.text)}</ThemedText>
      <Pressable onPress={handleDirectToChapter}>
        <ThemedText style={styles.verseRef}>
          ( {t(v.bookKey, { ns: "book", lng: queryLang })}{" "}
          {queryLang === "ar"
            ? Number(v.chapterNum).toLocaleString("ar-EG")
            : v.chapterNum}{" "}
          :{" "}
          {queryLang === "ar"
            ? Number(v.verseNum).toLocaleString("ar-EG")
            : v.verseNum}{" "}
          )
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  verseContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    gap: 8,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "justify",
  },
  verseWord: {
    fontSize: 18,
  },
  highlighted: {
    fontWeight: "bold",
  },
  verseRef: {
    flexWrap: "nowrap",
    textAlign: "center",
  },
});

export default VerseSearchResult;
