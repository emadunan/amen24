import React, { FC } from "react";
import { VerseWithMeta } from "@/interfaces/verse";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";

import {
  normalizeArText,
  removeArDiacritics,
  replaceWaslaAlef,
} from "@amen24/shared";

interface Props {
  v: VerseWithMeta;
  queryLang: string;
  query: string;
}

const VerseSearchResult: FC<Props> = ({ v, queryLang, query }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const words = query.trim().split(/\s+/);
  const isRtlQuery = queryLang === "ar";
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const handleDirectToChapter = () => {
    router.push(
      `/(tabs)/bible/${v.bookKey}?bookId=${v.bookId}&bookLen=${v.bookLen}&chapterNum=${v.chapterNum}&verseNum=${v.num}`
    );
  };

  const highlightText = (text: string) => {
    if (!query) return text;

    const normalizedQueryWords = words.map((word) =>
      queryLang === "ar"
        ? normalizeArText(removeArDiacritics(replaceWaslaAlef(word)))
        : word.toLowerCase()
    );

    const tokenize = (str: string) => str.split(/(\s+)/); // Keep spaces
    const tokens = tokenize(text);
    const parts: React.ReactNode[] = [];

    tokens.forEach((token, index) => {
      const normalizedToken =
        queryLang === "ar"
          ? normalizeArText(removeArDiacritics(replaceWaslaAlef(token)))
          : token.toLowerCase();

      const shouldHighlight = normalizedQueryWords.some((queryWord) =>
        normalizedToken.includes(queryWord)
      );

      if (shouldHighlight && token.trim()) {
        parts.push(
          <Text key={`highlight-${index}`} style={[styles.highlighted, { backgroundColor: theme.highlight }]}>
            {token}
          </Text>
        );
      } else {
        parts.push(<Text key={`text-${index}`}>{token}</Text>);
      }
    });

    return parts;
  };

  return (
    <ThemedView style={[styles.verseContainer, isRtlQuery && { direction: "rtl" }]}>
      <ThemedText style={styles.verseText}>{highlightText(v.text)}</ThemedText>
      <Pressable onPress={handleDirectToChapter}>
        <ThemedText
          type="subtitle"
          style={[
            styles.verseRef,
            { color: Colors[colorScheme ?? "light"].primary },
          ]}
        >
          ( {t(v.bookKey, { ns: "book", lng: queryLang })}{" "}
          {queryLang === "ar"
            ? Number(v.chapterNum).toLocaleString("ar-EG")
            : v.chapterNum}{" "}
          :{" "}
          {queryLang === "ar"
            ? Number(v.num).toLocaleString("ar-EG")
            : v.num}{" "}
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
    lineHeight: 34,
    textAlign: "justify",
  },
  highlighted: {
    backgroundColor: "#ffe58a", // light yellow
    borderRadius: 4,
    paddingHorizontal: 2,
  },
  verseRef: {
    flexWrap: "nowrap",
    textAlign: "center",
  },
});

export default VerseSearchResult;
