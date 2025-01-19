import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useLayoutEffect, useState } from 'react';


const Chapter = () => {
  const { key, bookId, chapterId } = useLocalSearchParams<{ key: string, bookId: string, chapterId: string }>();

  const [verses, setVerses] = useState<{ num: number, text: string }[]>([]);
  const navigation = useNavigation();

  const db = useSQLiteContext();

  useLayoutEffect(() => {
    if (key) {
      navigation.setOptions({
        title: key
      });
    }
  }, [])

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number, text: string }>(`SELECT versesEn.num, text FROM versesEn LEFT JOIN chapters ON versesEn.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE chapters.num = ? AND books.id = ?;`, [chapterId, bookId]);

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