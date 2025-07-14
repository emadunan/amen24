import VerseFeatured from "@/components/featured/VerseFeatured";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import OfflineFallbackText from "@/components/ui/OfflineFallbackText";
import { ThemedText } from "@/components/ui/ThemedText";
import { ThemedView } from "@/components/ui/ThemedView";
import { useFeedback } from "@/hooks/useFeedback";
import { RootState } from "@/store";
import { useGetAllFeaturedQuery } from "@/store/apis/featuredApi";
import { ERROR_KEYS, Lang } from "@amen24/shared";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

const Featured = () => {
  const { showError } = useFeedback();
  const { i18n } = useTranslation(["error"]);
  const lang = i18n.language as Lang;

  const isConnected = useSelector((state: RootState) => state.network.isConnected);

  useEffect(() => {
    if (!isConnected) {
      showError(ERROR_KEYS.NO_INTERNET_CONNECTION);
    }
  }, [isConnected]);

  const { data: featured, isLoading } = useGetAllFeaturedQuery({
    lang: i18n.language as Lang
  }, {
    skip: !isConnected,
    refetchOnReconnect: true,
  });

  if (isLoading) return <LoadingIndicator />

  if (!isLoading && (!featured || featured.length === 0)) {
    return <OfflineFallbackText />;
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={featured}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <VerseFeatured key={item.id} featured={item} lang={lang} />
        )}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 64,
    gap: 16,
  },
});

export default Featured;
