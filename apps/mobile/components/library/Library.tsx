import React from 'react';
import LibraryBookCard from './LibraryBookCard';
import { FlatList, StyleSheet, View } from 'react-native';
import { useGetLibraryBooksQuery } from '@/store/apis/libraryApi';

const Library: React.FC = () => {
  const { data: books } = useGetLibraryBooksQuery();

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LibraryBookCard
            slug={item.slug}
            title={item.title}
            author={item.author}
            current={item.chapters[0].id}
          />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default Library;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  listContent: {
    gap: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});
