import React, { FC, useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ThemedText } from "../ThemedText";
import { convertToSuperscript } from "@/utils";
import { useSQLiteContext } from "expo-sqlite";

interface Props {
  bookId: string;
  chapterNum: string;
}

const BibleChapterEn: FC<Props> = ({ bookId, chapterNum }) => {
  const db = useSQLiteContext();

  const [verses, setVerses] = useState<{ num: number; text: string }[]>([]);

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number; text: string }>(
        `SELECT versesEn.num, text FROM versesEn LEFT JOIN chapters ON versesEn.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE chapters.num = ? AND books.id = ?;`,
        [chapterNum, bookId],
      );

      setVerses(data);
    };

    fetchChapter();
  }, [chapterNum, bookId]);
  return (
    <Text style={styles.chapterText}>
      {verses.map((v) => (
        <ThemedText key={v.num} style={styles.verseText}>
          <Text style={styles.verseNum}>{convertToSuperscript(v.num)}</Text>{" "}
          {v.text}{" "}
        </ThemedText>
      ))}
    </Text>
  );
};

export default BibleChapterEn;

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
