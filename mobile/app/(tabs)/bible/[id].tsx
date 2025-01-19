import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useState } from 'react'

const Chapter = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [verses, setVerses] = useState<{ num: number, text: string }[]>([])
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number, text: string }>(`SELECT versesEn.num, text FROM versesEn LEFT JOIN chapters ON versesEn.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE chapters.num = 1 AND books.id = ?;`, [id]);

      setVerses(data);
    }

    fetchChapter();
  });
  return (
    <ThemedView >
      {verses.map(v => <ThemedText key={v.num}>{v.text}</ThemedText>)}
    </ThemedView>
  )
}

export default Chapter;