import React, { useEffect } from "react";
import { ThemedView } from "@/components/ui/ThemedView";
import { useGetUserFavoritesQuery } from "@/store/apis/favoriteApi";
import VerseFavorite from "@/components/favorite/VerseFavorite";
import { useTranslation } from "react-i18next";
import { ERROR_KEYS, Lang } from "@amen24/shared";
import { FlatList, StyleSheet } from "react-native";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ThemedText } from "@/components/ui/ThemedText";
import { useFeedback } from "@/hooks/useFeedback";
import OfflineFallbackText from "@/components/ui/OfflineFallbackText";

const Favorites = () => {
  const { showError } = useFeedback();
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const isConnected = useSelector((state: RootState) => state.network.isConnected);

  useEffect(() => {
    if (!isConnected) {
      showError(ERROR_KEYS.NO_INTERNET_CONNECTION);
    }
  }, [isConnected]);

  const { data: favorites, isLoading } = useGetUserFavoritesQuery(lang, {
    skip: !isConnected,
    refetchOnReconnect: true,
  });

  if (isLoading) return <LoadingIndicator />

  if (!isLoading && (!favorites || favorites.length === 0)) {
    return <OfflineFallbackText />;
  }

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
