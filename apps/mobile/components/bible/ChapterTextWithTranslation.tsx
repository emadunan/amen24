import React from 'react';
import { I18nManager, StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "@/constants";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { VerseWithTranslation } from "@/interfaces/verse";
import { formatNumber, getDirection, Lang } from "@amen24/shared";
import { BibleLang } from './BibleChapterText';

interface Props {
  uiLang: BibleLang;
  translationLang: BibleLang;
  verses: VerseWithTranslation[];
  highlighted: number[];
  onHighlight: (verseId: number) => void;
}

const ChapterTextWithTranslation: React.FC<Props> = ({
  uiLang,
  translationLang,
  verses,
  highlighted,
  onHighlight,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const isLangRTL = getDirection(uiLang as Lang) === "rtl";
  const isTranslationRTL = getDirection(translationLang as Lang) === "rtl";

  const shouldFlipLangDirection = isLangRTL !== I18nManager.isRTL;
  const shouldFlipTranslationDirection = isTranslationRTL !== I18nManager.isRTL;

  return (
    <View style={styles.wrapper}>
      {verses.map((verse) => {
        const uiText = uiLang === "ar" ? verse.textDiacritized : verse.text;
        const transText = translationLang === "ar" ? verse.text2Diacritized : verse.text2;

        return (
          <ThemedView key={verse.id} style={styles.verseRow}>
            {/* UI Language Column */}
            <View
              style={[
                styles.verseCol,
              ]}
            >
              <ThemedText
                onPress={() => onHighlight(verse.id)}
                style={[
                  styles.verseText,
                  {
                    writingDirection: shouldFlipLangDirection ? 'rtl' : 'ltr',
                    textAlign: shouldFlipLangDirection ? 'right' : 'left',
                  },
                  highlighted.includes(verse.id) && { backgroundColor: theme.highlight },
                ]}
              >
                <ThemedText style={styles.verseNum}>
                  {formatNumber(verse.num, uiLang as Lang)}{"\u00A0"}
                </ThemedText>
                {verse.textDiacritized}
              </ThemedText>
            </View>

            {/* Translation Language Column */}
            <View
              style={[
                styles.verseCol,

              ]}
            >
              <ThemedText
                onPress={() => onHighlight(verse.id)}
                style={[
                  styles.verseText,
                  {
                    writingDirection: shouldFlipTranslationDirection ? 'rtl' : 'ltr',
                    textAlign: shouldFlipTranslationDirection ? 'right' : 'left',
                  },
                  highlighted.includes(verse.id) && { backgroundColor: theme.highlight },
                ]}
              >
                <ThemedText style={styles.verseNum}>
                  {formatNumber(verse.num, translationLang as Lang)}{"\u00A0"}
                </ThemedText>
                {verse.text2Diacritized}
              </ThemedText>
            </View>
          </ThemedView>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    gap: 12,
  },
  verseRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  verseCol: {
    flex: 1,
  },
  verseNum: {
    fontSize: 12,
    color: "#f00",
  },
  verseText: {
    fontSize: 20,
    lineHeight: 32,
    flexWrap: "wrap",
    flexDirection: "row",
  },
  rtl: {
    textAlign: "right",
    writingDirection: "rtl",
  },
  ltr: {
    textAlign: "left",
    writingDirection: "ltr",
  },
});

export default ChapterTextWithTranslation;
