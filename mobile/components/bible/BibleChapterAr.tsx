import React, { FC, useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { convertToSuperscript } from "@/utils";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";

interface Props {
  bookId: string;
  chapterNum: string;
  verseNum?: string;
}

const BibleChapterAr: FC<Props> = ({ bookId, chapterNum, verseNum }) => {
  const db = useSQLiteContext();

  const [verses, setVerses] = useState<{ num: number; text: string }[]>([]);
  const [highlighted, setHighlighted] = useState<string[]>([]);

  const colorScheme = useColorScheme();

  const highlightTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].highlight,
  };

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number; text: string }>(
        `SELECT versesAr.num, text FROM versesAr LEFT JOIN chapters ON versesAr.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE chapters.num = ? AND books.id = ?;`,
        [chapterNum, bookId],
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
        : [...prevState, num],
    );
  }

  return (
    <Text style={styles.chapterText}>
      {verses.map((v) => (
        <ThemedText
          key={v.num}
          style={[
            styles.verseText,
            highlighted.includes(v.num.toString()) && highlightTheme,
          ]}
        >
          <Pressable onPress={handleHighlight.bind(this, v.num)}>
            <Text style={styles.verseNum}>{convertToSuperscript(v.num)}</Text>
          </Pressable>
          {v.text}{" "}
        </ThemedText>
      ))}
    </Text>
  );
};

export default BibleChapterAr;

const styles = StyleSheet.create({
  chapterText: {
    // textAlign: "justify",
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    alignItems: "flex-start",
  },
  verseNum: {
    color: "#f00",
  },
});
