import React, { useEffect } from "react";
import LibraryBookCard from "./LibraryBookCard";
import { FlatList, StyleSheet, useColorScheme } from "react-native";
import { useGetLibraryBooksQuery } from "@/store/apis/libraryApi";
import { ThemedView } from "../ui/ThemedView";
import { useFeedback } from "@/hooks/useFeedback";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { ERROR_KEYS } from "@amen24/shared";
import LoadingIndicator from "../ui/LoadingIndicator";
import OfflineFallbackText from "../ui/OfflineFallbackText";
import { Colors } from "@/constants";

const Library: React.FC = () => {
  const { showError } = useFeedback();
  const colorScheme = useColorScheme() ?? "light";
  const theme = Colors[colorScheme];

  const isConnected = useSelector((state: RootState) => state.network.isConnected);

  useEffect(() => {
    if (!isConnected) {
      showError(ERROR_KEYS.NO_INTERNET_CONNECTION);
    }
  }, [isConnected]);

  const { data: books, isLoading } = useGetLibraryBooksQuery(undefined, {
    skip: !isConnected,
    refetchOnReconnect: true,
  });

  if (isLoading) return <LoadingIndicator />

  if (!isLoading && (!books || books.length === 0)) {
    return <OfflineFallbackText />;
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
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
    paddingTop: 36,
  },
  listContent: {
    gap: 12,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 12,
  },
});
