import VerseFeatured from "@/components/featured/VerseFeatured";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { ThemedView } from "@/components/ui/ThemedView";
import { useGetAllFeaturedQuery } from "@/store/apis/featuredApi";
import { Lang } from "@amen24/shared";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native";

const Featured = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language as Lang;

  const { data: featured, isLoading } = useGetAllFeaturedQuery({
    lang: i18n.language as Lang,
  });

  if (isLoading) return <LoadingIndicator />

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={featured}
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
  }
});

export default Featured;
