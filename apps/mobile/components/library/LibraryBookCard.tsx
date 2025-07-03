import React from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { baseUrl } from '@/constants';

interface Props {
  slug: string;
  title: string;
  author?: string;
  current: string;
}

const LibraryBookCard: React.FC<Props> = ({ slug, title, author, current }) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/library/${slug}?current=${current}`)}
      style={styles.card}
    >
      <ImageBackground
        source={{ uri: `${baseUrl}/img/library-book-covers/${encodeURIComponent(slug)}.webp` }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>{title}</Text>
          {author && <Text style={styles.author}>&mdash; {author}</Text>}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default LibraryBookCard;

const styles = StyleSheet.create({
  card: {
    width: 160,
    aspectRatio: 2 / 3,
    margin: 8,
    borderRadius: 2,
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderRadius: 2,
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 10,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    color: '#ccc',
    fontSize: 14,
  },
});
