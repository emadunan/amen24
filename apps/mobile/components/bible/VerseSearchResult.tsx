import { IVerse } from "@/interfaces/verse";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useRouter } from "expo-router";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";

import {
  normalizeArText,
  removeArDiacritics,
  replaceWaslaAlef,
} from "@amen24/shared";

interface Props {
  v: IVerse;
  queryLang: string;
  query: string;
}

const VerseSearchResult: FC<Props> = ({ v, queryLang, query }) => {
  const { t } = useTranslation();
  const router = useRouter();

  const words = query.trim().split(/\s+/);
  const isRtlQuery = queryLang === "ar";
  const colorScheme = useColorScheme();

  const highlightedTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].highlight,
  };

  const handleDirectToChapter = () => {
    router.push(
      `/(tabs)/bible/${v.bookKey}?bookId=${v.bookId}&bookLen=${v.bookLen}&chapterNum=${v.chapterNum}&verseNum=${v.verseNum}`
    );
  };

  const mapIndexToOriginal = (
    original: string,
    normalized: string,
    targetIndex: number
  ): number => {
    let originalIndex = 0;
    let normIndex = 0;

    while (originalIndex < original.length && normIndex < targetIndex) {
      let char = original[originalIndex];
      let normChar = char;

      if (queryLang === "ar") {
        normChar = normalizeArText(removeArDiacritics(replaceWaslaAlef(char)));
      }

      normIndex += normChar.length;
      originalIndex++;
    }

    return originalIndex;
  };

  const highlightText = (text: string) => {
    if (!query) return text;

    const normalizedQueryWords = words.map((word) =>
      queryLang === "ar"
        ? normalizeArText(removeArDiacritics(replaceWaslaAlef(word)))
        : word
    );

    const tokenize = (str: string) => str.split(/(\s+)/); // Keep spaces

    const tokens = tokenize(text);
    const parts: React.ReactNode[] = [];

    tokens.forEach((token, index) => {
      const normalizedToken =
        queryLang === "ar"
          ? normalizeArText(removeArDiacritics(replaceWaslaAlef(token)))
          : token;

      const shouldHighlight = normalizedQueryWords.some((queryWord) =>
        normalizedToken.includes(queryWord)
      );

      if (shouldHighlight && token.trim()) {
        parts.push(
          <Text key={`highlight-${index}`} style={[styles.highlighted, highlightedTheme]}>
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
    lineHeight: 34,
    textAlign: "justify",
  },
  highlighted: {
  },
  verseRef: {
    flexWrap: "nowrap",
    textAlign: "center",
  },
});

export default VerseSearchResult;
