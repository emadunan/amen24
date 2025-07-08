import React, { FC, useLayoutEffect } from "react";
import {
  I18nManager,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import BibleChapterText, { BibleLang } from "@/components/bible/BibleChapterText";
import BibleChapterSelector from "./BibleChapterSelector";
import { BookKey } from "@amen24/shared";
import { HighlightProvider } from "@amen24/store";
import * as Clipboard from "expo-clipboard";

type SearchParams = {
  bookKey: string;
  bookId: string;
  bookLen: string;
  chapterNum: string;
  verseNum?: string;
}

const BibleChapter: FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const params = useLocalSearchParams<SearchParams>();

  const { bookKey, bookId, bookLen, chapterNum, verseNum } = params;

  useLayoutEffect(() => {
    if (bookKey) {
      navigation.setOptions({
        title: (
          <Text style={{ color: Colors[colorScheme ?? "light"].primary }}>
            {t(bookKey, { ns: "book" }).toLocaleUpperCase()}
          </Text>
        ),
        headerRight: () => <BibleChapterSelector chapterNum={chapterNum} bookId={bookId} bookLen={bookLen} bookKey={bookKey} />
      });
    }
  }, [bookKey, chapterNum, t, I18nManager.isRTL, colorScheme]);

  return (
    <ThemedView style={styles.container}>
      <View
        key={`${i18n.language}-${bookId}-${chapterNum}`}
        style={styles.chapterContainer}
      >
        <HighlightProvider
          language={i18n.language}
          t={t}
          copyToClipboard={(text: string) => Clipboard.setStringAsync(text)}
        >
          <BibleChapterText
            uiLang={i18n.language as BibleLang}
            translationLang="en"
            bookKey={bookKey as BookKey}
            bookId={bookId}
            chapterNum={chapterNum}
            verseNum={verseNum}
          />
        </HighlightProvider>
      </View>
    </ThemedView>
  );
};

export default BibleChapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chapterContainer: {
    margin: 16,
    display: "flex",
    flexDirection: "row",
    gap: 16
  }
});
