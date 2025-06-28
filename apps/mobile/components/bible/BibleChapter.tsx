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
import BibleChapterText from "@/components/bible/BibleChapterText";
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
      <ScrollView>
        <View
          key={`${i18n.language}-${bookId}-${chapterNum}`}
          style={styles.chapterContainer}
        >
          <HighlightProvider
            language={i18n.language}
            t={t}
            copyToClipboard={(text: string) => Clipboard.setStringAsync(text)}
          >
            {i18n.language === "ar" ? (
              <BibleChapterText
                bibleLang="ar"
                bookKey={bookKey as BookKey}
                bookId={bookId}
                chapterNum={chapterNum}
                verseNum={verseNum}
              />
            ) : (
              <BibleChapterText
                bibleLang="en"
                bookKey={bookKey as BookKey}
                bookId={bookId}
                chapterNum={chapterNum}
                verseNum={verseNum}
              />
            )}
          </HighlightProvider>
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default BibleChapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chapterContainer: {
    padding: 16,
  },
  toolbar: {
    flexDirection: "row",
    gap: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
