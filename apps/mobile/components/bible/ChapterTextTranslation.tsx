import React from 'react'
import { ThemedText } from '../ui/ThemedText';
import { StyleSheet, useColorScheme } from "react-native";
import { useTranslation } from "react-i18next";

import { Colors } from '@/constants';
import { Verse } from '@/interfaces/verse';
import { formatNumber, Lang } from '@amen24/shared';
import { BibleLang } from './BibleChapterText';

interface Props {
  lang: BibleLang;
  verses: Verse[];
  highlighted: number[];
  onHighlight: (verseNum: number) => void;
}

const ChapterTextTranslation: React.FC<Props> = ({ lang, verses, highlighted, onHighlight }) => {
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme();

  const theme = Colors[colorScheme ?? 'light'];

  return (
    <ThemedText style={styles.chapterContent}>
      {verses.map((verse) => (
        <ThemedText key={verse.num} onPress={() => onHighlight(verse.id)}>
          <ThemedText style={[
            styles.verseNum,
            { color: theme.danger },
            highlighted.includes(verse.id) && { backgroundColor: theme.highlight },
          ]} numberOfLines={1}>
            {formatNumber(verse.num, lang as Lang)}
            {"\u00A0"}
          </ThemedText>
          <ThemedText
            style={[
              styles.verseText,
              highlighted.includes(verse.id) && { backgroundColor: theme.highlight },
            ]}
          >
            {verse.textDiacritized}{" "}
          </ThemedText>
        </ThemedText>
      ))}
    </ThemedText>
  );
}

const styles = StyleSheet.create({
  chapterContent: {
    flex: 1,
    textAlign: "justify",
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