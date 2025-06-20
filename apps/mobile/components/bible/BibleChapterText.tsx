import React, { FC, useEffect, useState } from "react";
import { StyleSheet, TextStyle } from "react-native";
import { ThemedText } from "../ThemedText";
import { useSQLiteContext } from "expo-sqlite";
import { useTranslation } from "react-i18next";

type BibleLang = "en" | "ar" | "native"; // new lowercase lang codes matching DB

interface Props {
  bibleLang: BibleLang;
  bookId: string;
  chapterNum: string;
  verseNum?: string;
  highlighted: string[];
  setHighlighted: React.Dispatch<React.SetStateAction<string[]>>;
}

const BibleChapterText: FC<Props> = ({
  bibleLang,
  bookId,
  chapterNum,
  verseNum,
  highlighted,
  setHighlighted,
}) => {
  const db = useSQLiteContext();
  const { i18n } = useTranslation();
  const [verses, setVerses] = useState<{ num: number; textDiacritized: string }[]>([]);

  const highlightTheme: TextStyle = {
    textDecorationLine: "underline",
  };

  useEffect(() => {
    const fetchChapter = async () => {
      console.log(chapterNum, bookId, bibleLang);
      
      const data = await db.getAllAsync<{ num: number; textDiacritized: string }>(
        `
        SELECT v.num, vt.textDiacritized FROM verse v
        JOIN chapter c ON v.chapterId = c.id
        JOIN book b ON c.bookId = b.id
        JOIN verse_translation vt ON vt.verseId = v.id
        WHERE c.num = ? AND b.id = ? AND vt.lang = ?
        ORDER BY v.num ASC
        `,
        [chapterNum, bookId, bibleLang],
      );

      setVerses(data);
      if (verseNum) setHighlighted([verseNum]);
    };

    fetchChapter();
  }, [chapterNum, bookId, bibleLang]);

  function handleHighlight(verseNum: number) {
    const num = verseNum.toString();
    setHighlighted((prevState) =>
      prevState.includes(num)
        ? prevState.filter((v) => v !== num)
        : [...prevState, num],
    );
  }

  return (
    <ThemedText style={styles.chapterContent}>
      {verses.map((verse) => (
        <ThemedText key={verse.num} onPress={() => handleHighlight(verse.num)}>
          <ThemedText style={styles.verseNum} numberOfLines={1}>
            {i18n.language === "ar"
              ? verse.num.toLocaleString("ar-EG")
              : verse.num}
            {"\u00A0"}
          </ThemedText>
          <ThemedText
            style={[
              styles.verseText,
              highlighted.includes(verse.num.toString()) && highlightTheme,
            ]}
          >
            {verse.textDiacritized}{" "}
          </ThemedText>
        </ThemedText>
      ))}
    </ThemedText>
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
