import React from "react";
import { I18nManager, StyleSheet, useColorScheme, View } from "react-native";
import { Colors } from "@/constants";
import { ThemedText } from "../ui/ThemedText";
import { ThemedView } from "../ui/ThemedView";
import { VerseWithTranslation } from "@/interfaces/verse";
import {
  BookKey,
  formatNumber,
  getDirection,
  Lang,
  resolveRenderLang,
} from "@amen24/shared";
import { BibleLang } from "./BibleChapterText";

interface Props {
  uiLang: BibleLang;
  translationLang: BibleLang;
  bookKey: BookKey;
  verses: VerseWithTranslation[];
  highlighted: number[];
  onHighlight: (verseId: number) => void;
}

const ChapterTextWithTranslation: React.FC<Props> = ({
  uiLang,
  translationLang,
  bookKey,
  verses,
  highlighted,
  onHighlight,
}) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const isLangRTL = getDirection(uiLang as Lang) === "rtl";

  const renderLang = resolveRenderLang(translationLang as Lang, bookKey);
  const isTranslationRTL = getDirection(renderLang as Lang) === "rtl";

  return (
    <View style={styles.wrapper}>
      {verses.map((verse) => {
        return (
          <ThemedView key={verse.id} style={styles.verseRow}>
            {/* UI Language Column */}
            <View
              style={[styles.verseCol, isLangRTL ? styles.rtl : styles.ltr]}
            >
              <ThemedText
                onPress={() => onHighlight(verse.id)}
                style={[
                  styles.verseText,
                  uiLang === Lang.ARABIC && styles.textAr,
                  uiLang === Lang.ENGLISH && styles.textEn,
                  highlighted.includes(verse.id) && {
                    backgroundColor: theme.highlight,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.verseNum,
                    { color: theme.danger },
                    uiLang === Lang.ARABIC && styles.textAr,
                    uiLang === Lang.ENGLISH && styles.textEn,
                  ]}
                >
                  {formatNumber(verse.num, uiLang as Lang)}
                  {"\u00A0"}
                </ThemedText>
                {verse.textDiacritized}
              </ThemedText>
            </View>

            {/* Translation Language Column */}
            <View
              style={[
                styles.verseCol,
                isTranslationRTL ? styles.rtl : styles.ltr,
              ]}
            >
              <ThemedText
                onPress={() => onHighlight(verse.id)}
                style={[
                  styles.verseText,
                  renderLang === Lang.ARABIC && styles.textAr,
                  renderLang === Lang.ENGLISH && styles.textEn,
                  renderLang === Lang.HEBREW && styles.textHe,
                  highlighted.includes(verse.id) && {
                    backgroundColor: theme.highlight,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.verseNum,
                    { color: theme.danger },
                    renderLang === Lang.ARABIC && styles.textAr,
                    renderLang === Lang.ENGLISH && styles.textEn,
                    renderLang === Lang.HEBREW && styles.textHe,
                    renderLang === Lang.GREEK && styles.textEl,
                  ]}
                >
                  {formatNumber(verse.num, renderLang as Lang)}
                  {"\u00A0"}
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
    textAlign: "justify",
  },
  verseText: {
    fontSize: 20,
    textAlign: "justify",
  },
  rtl: {
    direction: "rtl",
  },
  ltr: {
    direction: "ltr",
  },
  textAr: {
    lineHeight: 40,
  },
  textEn: {
    lineHeight: 32,
  },
  textHe: {
    lineHeight: 34,
  },
  textEl: {
    lineHeight: 32,
  }
});

export default ChapterTextWithTranslation;
