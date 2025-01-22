import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Pressable, StyleSheet, ScrollView, Text } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';


const Chapter = () => {
  const { key, bookId, chapterNum } = useLocalSearchParams<{ key: string, bookId: string, chapterNum: string }>();

  const router = useRouter();
  const navigation = useNavigation();

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
          <ThemedText style={styles.chapterNum} >{chapterNum}</ThemedText>
          <Pressable onPress={handleNextChapter}><IconSymbol name='chevron.right' color={`#000`} /></Pressable>
        </ThemedView>
      });
    }
  }, [chapterNum, chapterNum]);

  const db = useSQLiteContext();
  const [verses, setVerses] = useState<{ num: number, text: string }[]>([]);

  useEffect(() => {
    const fetchChapter = async () => {
      const data = await db.getAllAsync<{ num: number, text: string }>(`SELECT versesEn.num, text FROM versesEn LEFT JOIN chapters ON versesEn.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE chapters.num = ? AND books.id = ?;`, [chapterNum, bookId]);

      setVerses(data);
    }

    fetchChapter();
  }, [chapterNum, bookId]);

  return (
    <ScrollView>
      <ThemedView key={`${bookId}-${chapterNum}`} style={styles.chapterContainer}>
        <Text style={styles.chapterText}>
          {verses.map(v => <ThemedText key={v.num} style={styles.verseText}>{v.text} </ThemedText>)}
        </Text>
      </ThemedView>
    </ScrollView>
  )
}

export default Chapter;

const styles = StyleSheet.create({
  chapterGroup: {
    flexDirection: "row",
    backgroundColor: "#fff",
  },
  chapterNum: {
    marginHorizontal: 4,
  },
  chapterContainer: {
    padding: 16,
  },
  chapterText: {
    textAlign: 'justify',
  },
  verseText: {
    fontSize: 18,
    lineHeight: 24,
  }
});