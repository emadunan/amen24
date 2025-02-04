import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { ThemedText } from "../ThemedText";
import { useSQLiteContext } from "expo-sqlite";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";
import { ThemedView } from "../ThemedView";

type BibleLang = "En" | "Ar";

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
  const [verses, setVerses] = useState<{ num: number; text: string }[]>([]);
  const colorScheme = useColorScheme();

  const highlightTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].highlight,
  };

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number; text: string }>(
        `SELECT verses${bibleLang}.num, text FROM verses${bibleLang} 
        LEFT JOIN chapters ON verses${bibleLang}.chapterId = chapters.id 
        LEFT JOIN books ON chapters.bookId = books.id 
        WHERE chapters.num = ? AND books.id = ?;`,
        [chapterNum, bookId]
      );

      setVerses(data);
      if (verseNum) setHighlighted([verseNum]);
    };

    fetchChapter();
  }, [chapterNum, bookId]);

  function handleHighlight(verseNum: number) {
    const num = verseNum.toString();
    setHighlighted((prevState) =>
      prevState.includes(num)
        ? prevState.filter((v) => v !== num)
        : [...prevState, num]
    );
  }

  return (
    <ThemedText style={styles.chapterContent}>
      {verses.map(verse => <ThemedText key={verse.num} onPress={handleHighlight.bind(this, verse.num)} style={[highlighted.includes(verse.num.toString()) && highlightTheme]}>
        <ThemedText style={[styles.verseNum]} numberOfLines={1}>
          {i18n.language === "ar"
            ? verse.num.toLocaleString("ar-EG") // Arabic numerals
            : verse.num
          }
          {"\u00A0"}
        </ThemedText>
        <ThemedText style={styles.verseText}>{verse.text}</ThemedText>
        <ThemedText>{" "}</ThemedText>
      </ThemedText>)}
    </ThemedText>
  );
};

export default BibleChapterText;

const styles = StyleSheet.create({
  chapterContent: {
    textAlign: "justify",
  },
  verseText: {
    fontSize: 18,
  },
  verseNum: {
    fontSize: 12,
    color: "#f00",
  },
});
