import { IVerse } from "@/interfaces/verse";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
  v: IVerse;
  queryLang: string;
  query: string;
}

const VerseSearchResult: FC<Props> = ({ v, queryLang, query }) => {
  const { t } = useTranslation();

  const words = query.trim().split(/\s+/);

  const isRtlQuery: boolean = queryLang === "ar";

  const rtlStyles = {
    direction: "rtl" as "rtl" | "ltr",
  };

  // Function to highlight matching words
  const highlightText = (text: string) => {
    if (!query) return text; // If there's no query, return the text as is
  
    // Escape special regex characters in the query words (important!)
    const escapedWords = words.map(word => word.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
  
    // Create a regex pattern to match any of the words in the array, no matter where they appear
    const regex = new RegExp(`(${escapedWords.join("|")})`, "gi");
  
    // Split the text based on the regex and wrap matching parts in a highlight style
    const parts = text.split(regex);
  
    return parts.map((part, index) =>
      regex.test(part) ? (
        <Text key={index} style={styles.highlighted}>{part}</Text>
      ) : (
        <Text key={index}>{part}</Text>
      )
    );
  };

  return (
    <ThemedView
      key={v.id}
      style={[styles.verseContainer, isRtlQuery && rtlStyles]}
    >
      <ThemedText style={styles.verseText}>{highlightText(v.text)}</ThemedText>
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
    backgroundColor: "#ffeb3b", // Highlight color (yellow)
    fontWeight: "bold",
  },
  verseRef: {
    flexWrap: "nowrap",
    textAlign: "center",
  },
});

export default VerseSearchResult;
