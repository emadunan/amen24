import React, { useMemo } from "react";
import {
  I18nManager,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { BookKey, BookMap, formatNumber, Lang, Verse } from "@amen24/shared";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons"; // Or use any icon library
import { Link } from "expo-router";
import { Colors } from "@/constants";

interface VerseBlockProps {
  bookId: number;
  bookKey: BookKey;
  chapterNum: number;
  totalChapters: number;
  verseNum: number;
  verses: Verse[];
  lang: Lang;
  onRemove?: () => void;
}

const VerseBlock: React.FC<VerseBlockProps> = ({
  bookId,
  bookKey,
  chapterNum,
  totalChapters,
  verseNum,
  verses,
  lang,
  onRemove,
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const dir = lang === "ar" ? "rtl" : "ltr";
  const isRTL = dir === "rtl";

  const lastVerseNum = verses[verses.length - 1]?.num;
  const formattedChapterNum = formatNumber(chapterNum, lang);
  const formattedVerseNum = formatNumber(verseNum, lang);
  const formattedLastVerseNum = formatNumber(lastVerseNum || -1, lang);

  const verseText = useMemo(() => {
    return verses
      .map((verse, idx, arr) => {
        const currentText = verse.verseTranslations[0].textDiacritized;
        if (idx === 0) return currentText;

        const prevNum = arr[idx - 1].num;
        const isSequential = verse.num === prevNum + 1;

        return (isSequential ? " " : " .. ") + currentText;
      })
      .join("");
  }, [verses]);

  const reference =
    `${BookMap[bookKey].title[lang as Lang.ARABIC | Lang.ENGLISH]} ${formattedChapterNum} : ${formattedVerseNum}` +
    (verses.length > 1 ? ` - ${formattedLastVerseNum}` : "");

  return (
    <ThemedView style={[styles.container, isRTL && styles.rtl]}>
      <ThemedText style={[styles.verseText, isRTL && styles.rtlText]}>
        {verseText}
      </ThemedText>

      <ThemedView style={styles.actions}>
        <Link
          href={`/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${totalChapters}&chapterNum=${chapterNum}&v=${verses.map(v => v.id).join(",")}`}
        >

          <ThemedText
            type="title"
            style={[styles.reference, { color: theme.primary }]}
            numberOfLines={1}
          >
            &mdash; {reference}
          </ThemedText>
        </Link>

        {onRemove && (
          <Pressable
            style={[styles.removeButton, { borderColor: theme.danger }]}
            onPress={onRemove}
          >
            <Ionicons name="trash" size={16} color={theme.danger} />
            <ThemedText style={[styles.removeText, { color: theme.danger }]}>
              {t("main.remove")}
            </ThemedText>
          </Pressable>
        )}
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderLeftWidth: 4,
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 4,
    borderRadius: 2,
  },
  rtl: {
    borderLeftWidth: 1,
    borderRightWidth: 4,
  },
  verseText: {
    fontSize: 22,
    lineHeight: 36,
    textAlign: "justify",
  },
  rtlText: {
    writingDirection: I18nManager.isRTL ? "rtl" : "ltr",
    lineHeight: 48,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  reference: {
    fontSize: 18,
  },
  removeButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 2,
    borderWidth: 1,
  },
  removeText: {
    marginLeft: 6,
    fontSize: 14,
  },
});

export default VerseBlock;
