import React from 'react';
import LibraryBookCard from './LibraryBookCard';
import { FlatList, StyleSheet, View } from 'react-native';
import { useGetLibraryBooksQuery } from '@/store/apis/libraryApi';
import { ThemedView } from '../ThemedView';

const Library: React.FC = () => {
  const { data: books } = useGetLibraryBooksQuery();

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LibraryBookCard
            slug={item.slug}
            title={item.title}
            author={item.author}
            current={item.firstChapterId!}
          />
        )}
      />
    </ThemedView>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
    paddingTop: 36
  },
  listContent: {
    gap: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
