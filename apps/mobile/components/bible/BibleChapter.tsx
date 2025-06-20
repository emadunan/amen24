import React, { FC, useLayoutEffect, useState } from "react";
import {
  I18nManager,
  Pressable,
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
import AntDesign from "@expo/vector-icons/AntDesign";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import BibleChapterText from "@/components/bible/BibleChapterText";
import { useSQLiteContext } from "expo-sqlite";
import { IVerseRaw } from "@/interfaces/verse";
import * as Clipboard from "expo-clipboard";
import BibleChapterSelector from "./BibleChapterSelector";

type SearchParams = {
  key: string;
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
  const db = useSQLiteContext();

  const { key, bookId, bookLen, chapterNum, verseNum } = params;
  const [highlighted, setHighlighted] = useState<string[]>([]);
  const bibleLang = i18n.language === "ar" ? "Ar" : "En";

  useLayoutEffect(() => {
    if (key) {
      setHighlighted([]);
      navigation.setOptions({
        title: (
          <Text style={{ color: Colors[colorScheme ?? "light"].primary }}>
            {t(key, { ns: "book" }).toLocaleUpperCase()}
          </Text>
        ),
        headerRight: () => <BibleChapterSelector chapterNum={chapterNum} bookId={bookId} bookLen={bookLen} bookKey={key} />
      });
    }
  }, [key, chapterNum, t, I18nManager.isRTL, colorScheme]);

  function handleRemoveHighlights() {
    setHighlighted([]);
  }

  async function handleCopySelected() {
    if (highlighted.length === 0) return;

    const verses = await db.getAllAsync<IVerseRaw>(
      `
        SELECT vt.text, v.num as num 
        FROM verse_translation vt
        LEFT JOIN verse v ON vt.verseId = v.id
        LEFT JOIN chapter c ON v.chapterId = c.id
        WHERE c.bookId = ? 
          AND c.num = ? 
          AND v.num IN (${highlighted.map(() => "?").join(",")}) 
          AND vt.lang = ?
        ORDER BY v.id
      `,
      [bookId, chapterNum, ...highlighted, bibleLang],
    );

    let formattedText = "";
    let previousNum = verses[0].num - 1; // Start one number before the first verse

    for (const verse of verses) {
      if (verse.num - previousNum > 1) {
        // If there's a gap, add "..."
        formattedText += " ...";
      }
      // Append verse text
      formattedText += ` ${verse.text}`;
      previousNum = verse.num;
    }

    formattedText += ` ( ${t(key, { ns: "book" })} ${i18n.language === "ar" ? Number(chapterNum).toLocaleString("ar-EG") : chapterNum} : ${i18n.language === "ar" ? Number(verses[0].num).toLocaleString("ar-EG") : verses[0].num} `;

    if (verses.length > 1) {
      formattedText += `- ${i18n.language === "ar" ? Number(verses[verses.length - 1].num).toLocaleString("ar-EG") : verses[verses.length - 1].num} )`;
    } else {
      formattedText += `)`;
    }

    const content = formattedText.trim();

    await Clipboard.setStringAsync(content);
  }

  return (
    <ThemedView style={styles.container}>
      {highlighted.length > 0 && (
        <View style={styles.toolbar}>
          <Pressable onPress={handleRemoveHighlights}>
            <MaterialIcons
              name="highlight-off"
              size={24}
              color={Colors[colorScheme ?? "light"].primary}
            />
          </Pressable>
          <Pressable onPress={handleCopySelected}>
            <AntDesign
              name="copy1"
              size={24}
              color={Colors[colorScheme ?? "light"].primary}
            />
          </Pressable>
        </View>
      )}
      <ScrollView>
        <View
          key={`${i18n.language}-${bookId}-${chapterNum}`}
          style={styles.chapterContainer}
        >
          {i18n.language === "ar" ? (
            <BibleChapterText
              bibleLang="ar"
              bookId={bookId}
              chapterNum={chapterNum}
              verseNum={verseNum}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
            />
          ) : (
            <BibleChapterText
              bibleLang="en"
              bookId={bookId}
              chapterNum={chapterNum}
              verseNum={verseNum}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
            />
          )}
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
