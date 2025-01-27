import React, { FC, useLayoutEffect } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AntDesign from '@expo/vector-icons/AntDesign';
import BibleChapterEn from '@/components/bible/BibleChapterEn';
import BibleChapterAr from '@/components/bible/BibleChapterAr';
import { useTranslation } from 'react-i18next';
import { DrawerActions } from '@react-navigation/native';

interface Props {
}

const BibleChapter: FC<Props> = (props) => {
  const { t, i18n } = useTranslation();
  const { key, bookId, bookLen, chapterNum } = useLocalSearchParams<{ key: string, bookId: string, bookLen: string, chapterNum: string }>();

  const router = useRouter();
  const navigation = useNavigation();

  function handleNextChapter() {
    const nextChapterNum = parseInt(chapterNum) + 1;
    const bookLength = parseInt(bookLen);

    if (nextChapterNum > bookLength - 1) return;

    router.push(`/(tabs)/bible/${key}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${nextChapterNum}`);
  }

  function handlePrevChapter() {
    const prevChapterNum = parseInt(chapterNum) - 1;

    if (prevChapterNum < 1) return;

    router.push(`/(tabs)/bible/${key}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${prevChapterNum}`);
  }

  useLayoutEffect(() => {
    if (key) {
      navigation.setOptions({
        title: t(key, { ns: "book" }),
        headerRight: () => <ThemedView style={styles.chapterGroup} >
          <Pressable onPress={handlePrevChapter}><AntDesign name="caretleft" size={24} color="black" /></Pressable>
          <Pressable onPress={() => {
            console.log("Pressed");
            navigation.dispatch(DrawerActions.openDrawer());
          }}><ThemedText style={styles.chapterNum} >{chapterNum}</ThemedText></Pressable>
          <Pressable onPress={handleNextChapter}><AntDesign name="caretright" size={24} color="black" /></Pressable>
        </ThemedView>
      });
    }
  }, [key, chapterNum, t]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View key={`${bookId}-${chapterNum}`} style={styles.chapterContainer}>
          {i18n.language === 'ar' ?
            <BibleChapterAr bookId={bookId} chapterNum={chapterNum} /> :
            <BibleChapterEn bookId={bookId} chapterNum={chapterNum} />}
        </View>
      </ScrollView>
    </ThemedView>
  )
}

export default BibleChapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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