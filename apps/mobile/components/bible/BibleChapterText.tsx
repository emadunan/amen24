import React, { FC, useEffect, useState } from "react";
import { StyleSheet, TextStyle, useColorScheme } from "react-native";
import { ThemedText } from "../ThemedText";
import { useSQLiteContext } from "expo-sqlite";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants";
import { BookKey, Verse } from "@amen24/shared";
import { useHighlightContext } from "@amen24/store";
import BibleChapterToolbox from "./BibleChapterToolbox";

type BibleLang = "en" | "ar" | "native"; // new lowercase lang codes matching DB

interface Props {
  bibleLang: BibleLang;
  bookKey: BookKey;
  bookId: string;
  chapterNum: string;
  verseNum?: string;
}

const BibleChapterText: FC<Props> = ({
  bibleLang,
  bookKey,
  bookId,
  chapterNum,
  verseNum,
}) => {
  const db = useSQLiteContext();
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const [verses, setVerses] = useState<{ id: number, num: number; text: string; textDiacritized: string }[]>([]);

  const formattedVerses = verses.map((v) => ({
    id: v.id,
    num: v.num,
    verseTranslations: [{ text: v.textDiacritized }],
  }));

  const { highlighted, toggleHighlight } = useHighlightContext();

  const highlightTheme: TextStyle = {
    backgroundColor: Colors[colorScheme ?? 'light'].highlight,
  };

  useEffect(() => {
    const fetchChapter = async () => {
      console.log(chapterNum, bookId, bibleLang);

      const data = await db.getAllAsync<{ id: number, num: number; text: string; textDiacritized: string }>(
        `
        SELECT v.id, v.num, vt.text, vt.textDiacritized FROM verse v
        JOIN chapter c ON v.chapterId = c.id
        JOIN book b ON c.bookId = b.id
        JOIN verse_translation vt ON vt.verseId = v.id
        WHERE c.num = ? AND b.id = ? AND vt.lang = ?
        ORDER BY v.num ASC
        `,
        [chapterNum, bookId, bibleLang],
      );

      setVerses(data);

      if (verseNum) {
        const verseId = verses.find(v => v.num = +verseNum)?.id;
        if (!verseId) return;

        toggleHighlight(verseId)
      };
    };

    fetchChapter();
  }, [chapterNum, bookId, bibleLang]);

  function handleHighlight(verseId: number) {
    toggleHighlight(verseId);
  }

  return (
    <>
      <ThemedText style={styles.chapterContent}>
        {verses.map((verse) => (
          <ThemedText key={verse.num} onPress={() => handleHighlight(verse.id)}>
            <ThemedText style={[
              styles.verseNum,
              highlighted.includes(verse.id) && highlightTheme,
            ]} numberOfLines={1}>
              {i18n.language === "ar"
                ? verse.num.toLocaleString("ar-EG")
                : verse.num}
              {"\u00A0"}
            </ThemedText>
            <ThemedText
              style={[
                styles.verseText,
                highlighted.includes(verse.id) && highlightTheme,
              ]}
            >
              {verse.textDiacritized}{" "}
            </ThemedText>
          </ThemedText>
        ))}
      </ThemedText>
      <BibleChapterToolbox bookKey={bookKey} chapterNum={+chapterNum} verses={formattedVerses as Verse[]} />
    </>
  );
};

export default BibleChapterText;

const styles = StyleSheet.create({
  chapterContent: {
    textAlign: "justify",
  },
  verseText: {
    fontSize: 22,
    lineHeight: 48,
  },
  verseNum: {
    fontSize: 12,
    lineHeight: 48,
    color: "#f00",
  },
});
