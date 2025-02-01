import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
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

  const verseTheme = {
    color: Colors[colorScheme ?? "light"].text,
  }

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
    <ThemedView>
      <Text style={styles.chapterText}>
        {verses.map((v, index) => (
          <Pressable key={v.num} onPress={() => handleHighlight(v.num)}>
            <Text
              style={[
                styles.verseText,
                verseTheme,
                highlighted.includes(v.num.toString()) && highlightTheme,
              ]}
            >
              <Text style={styles.verseNum}>
                {i18n.language === "ar"
                  ? v.num.toLocaleString("ar-EG") // Arabic numerals
                  : v.num}
              </Text>{" "}
              {v.text}
              {index < verses.length - 1 ? " " : ""} {/* Space between verses */}
            </Text>
          </Pressable>
        ))}
      </Text>
    </ThemedView>
  );
};

export default BibleChapterText;

const styles = StyleSheet.create({
  chapterText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "justify",
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
  },
  verseNum: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#f00",
  },
});
