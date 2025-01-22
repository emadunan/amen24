import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';


const Chapter = () => {
  const { key, bookId, chapterNum } = useLocalSearchParams<{ key: string, bookId: string, chapterNum: string }>();
  
  const router = useRouter();

  const [verses, setVerses] = useState<{ num: number, text: string }[]>([]);
  const navigation = useNavigation();

  const db = useSQLiteContext();

  function handleNextChapter() {
    router.push(`/(tabs)/bible/${key}?bookId=${bookId}&chapterNum=${parseInt(chapterNum) + 1}`);
  }

  function handlePrevChapter() {
    router.push(`/(tabs)/bible/${key}?bookId=${bookId}&chapterNum=${parseInt(chapterNum) - 1}`);
  }

  useLayoutEffect(() => {
    if (key) {
      navigation.setOptions({
        title: key,
        headerRight: () => <ThemedView style={styles.chapterGroup} >
          <Pressable onPress={handlePrevChapter}><IconSymbol name='chevron.left' color={`#000`} /></Pressable>
          <ThemedText>{chapterNum}</ThemedText>
          <Pressable onPress={handleNextChapter}><IconSymbol name='chevron.right' color={`#000`} /></Pressable>
        </ThemedView>
      });
    }
  }, [chapterNum, chapterNum])

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number, text: string }>(`SELECT versesEn.num, text FROM versesEn LEFT JOIN chapters ON versesEn.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE chapters.num = ? AND books.id = ?;`, [chapterNum, bookId]);

      setVerses(data);
    }

    fetchChapter();
  }, [chapterNum, bookId]);
  return (
    <ThemedView key={`${bookId}-${chapterNum}`}>
      {verses.map(v => <ThemedText key={v.num}>{v.text}</ThemedText>)}
    </ThemedView>
  )
}

export default Chapter;

const styles = StyleSheet.create({
  chapterGroup: {
    flexDirection: "row",
    backgroundColor: "#fff"
  }
})