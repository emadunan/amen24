import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
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
    };

    fetchChapter();
  }, [chapterNum, bookId]);
  return (
    <Text style={styles.chapterText}>
      {verses.map((v) => (
        <ThemedText
          key={v.num}
          style={[
            styles.verseText,
            v.num.toString() === verseNum && highlightTheme,
          ]}
        >
          <Text style={styles.verseNum}>{convertToSuperscript(v.num)}</Text>{" "}
          {v.text}{" "}
        </ThemedText>
      ))}
    </Text>
  );
};

export default BibleChapterAr;

const styles = StyleSheet.create({
  chapterText: {
    textAlign: "justify",
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
