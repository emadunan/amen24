import React from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { useGetUserFavoritesQuery } from "@/store/apis/favoriteApi";
import VerseFavorite from "@/components/favorite/VerseFavorite";
import { useTranslation } from "react-i18next";
import { Lang } from "@amen24/shared";
import { FlatList, StyleSheet } from "react-native";
import LoadingIndicator from "@/components/ui/LoadingIndicator";

const Favorites = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const { data: favorites, isLoading } = useGetUserFavoritesQuery(lang);

  if (isLoading) return <LoadingIndicator />

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => (
          <VerseFavorite key={item.id} favorite={item} lang={lang} />
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Favorites;
