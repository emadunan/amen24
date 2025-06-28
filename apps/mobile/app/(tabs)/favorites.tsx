import React from 'react';
import { ThemedView } from '@/components/ThemedView';
import { useGetUserFavoritesQuery } from '@/store/apis/favoriteApi';
import VerseFavorite from '@/components/favorite/VerseFavorite';
import { useTranslation } from 'react-i18next';
import { Lang } from '@amen24/shared';
import { StyleSheet } from 'react-native';

const Favorites = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const { data: favorites } = useGetUserFavoritesQuery(lang);
  
  return (
    <ThemedView style={styles.container}>
      {favorites?.map(f => <VerseFavorite key={f.id} favorite={f} lang={lang}/>)}
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default Favorites;