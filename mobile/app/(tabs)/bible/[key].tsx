import React, { useLayoutEffect } from 'react';
import { Pressable, StyleSheet, ScrollView, Text, View } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import BibleChapterEn from '@/components/bible/BibleChapterEn';
import BibleChapterAr from '@/components/bible/BibleChapterAr';
import { useTranslation } from 'react-i18next';


const Chapter = () => {
  const { t, i18n } = useTranslation();
  const { key, bookId, chapterNum } = useLocalSearchParams<{ key: string, bookId: string, chapterNum: string }>();

  const router = useRouter();
  const navigation = useNavigation();

  function handleNextChapter() {
    const nextChapterNum = parseInt(chapterNum) + 1;

    if (nextChapterNum > 100) return;

    router.push(`/(tabs)/bible/${key}?bookId=${bookId}&chapterNum=${nextChapterNum}`);
  }

  function handlePrevChapter() {
    const prevChapterNum = parseInt(chapterNum) - 1;

    if (prevChapterNum < 1) return;

    router.push(`/(tabs)/bible/${key}?bookId=${bookId}&chapterNum=${prevChapterNum}`);
  }

  useLayoutEffect(() => {
    if (key) {
      navigation.setOptions({
        title:t(key, { ns: "book" }),
        headerRight: () => <ThemedView style={styles.chapterGroup} >
          <Pressable onPress={handlePrevChapter}><IconSymbol name='chevron.left' color={`#000`} /></Pressable>
          <ThemedText style={styles.chapterNum} >{chapterNum}</ThemedText>
          <Pressable onPress={handleNextChapter}><IconSymbol name='chevron.right' color={`#000`} /></Pressable>
        </ThemedView>
      });
    }
  }, [key, chapterNum, t]);

  return (
    <ScrollView>
      <ThemedView key={`${bookId}-${chapterNum}`} style={styles.chapterContainer}>
        {i18n.language === 'ar' ?
          <BibleChapterAr bookId={bookId} chapterNum={chapterNum} /> :
          <BibleChapterEn bookId={bookId} chapterNum={chapterNum} />}
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
  }
});