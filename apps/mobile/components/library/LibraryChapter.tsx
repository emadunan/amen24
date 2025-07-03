import React, { FC, useLayoutEffect } from 'react';
import { ThemedText } from '../ThemedText';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Text, useColorScheme } from 'react-native';
import { Colors } from '@/constants';
import LibraryChapterSelector from './LibraryChapterSelector';
import { useGetLibraryBookQuery } from '@/store/apis/libraryApi';

type SearchParams = {
  slug: string;
  current: string;
}

const LibraryChapter: FC = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  const params = useLocalSearchParams<SearchParams>();
  const { slug, current } = params;

  const { data: libBook } = useGetLibraryBookQuery(slug);
  console.log("Library Chapter::", slug, current);

  const currentChapter = libBook?.chapters.find(ch => ch.id === current);

  useLayoutEffect(() => {
  if (currentChapter?.title) {
    navigation.setOptions({
      title: (
        <Text style={{ color: Colors[colorScheme ?? "light"].primary }}>
          {libBook?.title}
        </Text>
      ),
      headerRight: () => <LibraryChapterSelector title={currentChapter?.title} />
    });
  }
}, [currentChapter?.title, colorScheme, libBook?.title]);

  return (
    <ThemedText>{currentChapter?.content}</ThemedText>
  )
}

export default LibraryChapter