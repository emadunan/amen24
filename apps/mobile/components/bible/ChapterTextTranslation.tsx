import React from "react";
import { ThemedText } from "../ui/ThemedText";
import { Pressable, StyleSheet, useColorScheme } from "react-native";

import { Colors } from "@/constants";
import { Verse } from "@/interfaces/verse";
import { formatNumber, Lang } from "@amen24/shared";
import { BibleLang } from "./BibleChapterText";
import { ThemedView } from "../ui/ThemedView";

interface Props {
  lang: BibleLang;
  verses: Verse[];
  verseNum?: number;
  textJustify: boolean;
  highlighted: number[];
  onHighlight: (verseNum: number) => void;
}

const ChapterTextTranslation: React.FC<Props> = ({
  lang,
  verses,
  verseNum,
  highlighted,
  onHighlight,
  textJustify,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  if (textJustify) {
    return (
      <ThemedText style={styles.chapterContent}>
        {verses.map((verse) => (
          <ThemedText key={verse.num} onPress={() => onHighlight(verse.id)}>
            <ThemedText
              style={[
                styles.verseNum,
                { color: theme.danger },
                highlighted.includes(verse.id) && {
                  backgroundColor: theme.highlight,
                },
              ]}
              numberOfLines={1}
            >
              {formatNumber(verse.num, lang as Lang)}
              {"\u00A0"}
            </ThemedText>
            <ThemedText
              style={[
                styles.verseText,
                highlighted.includes(verse.id) && {
                  backgroundColor: theme.highlight,
                },
              ]}
            >
              {verse.textDiacritized}{" "}
            </ThemedText>
          </ThemedText>
        ))}
      </ThemedText>
    );
  }


  return (
    <ThemedView>
      {verses.map((verse) => (
        <Pressable key={verse.num} onPress={() => onHighlight(verse.id)}>
          <ThemedView style={styles.chapterView}>
            <ThemedText style={[styles.verseNum, { color: theme.danger }]}>
              {formatNumber(verse.num, lang as Lang)}
            </ThemedText>
            <ThemedText
              style={[
                styles.verseText,
                highlighted.includes(verse.id) && {
                  backgroundColor: theme.highlight,
                },
              ]}
            >
              {verse.textDiacritized}
            </ThemedText>
          </ThemedView>
        </Pressable>
      ))}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  chapterContent: {
    flex: 1,
    textAlign: "justify",
  },
  chapterView: {
    flexDirection: "row",
    marginVertical: 2,
    marginRight: 42,
    columnGap: 8,
  },
  verseText: {
    fontSize: 22,
    lineHeight: 48,
  },
  verseNum: {
    fontSize: 12,
    lineHeight: 48,
  },
});

export default ChapterTextTranslation;
