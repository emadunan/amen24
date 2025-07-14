import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, ActivityIndicator } from "react-native";
import { useTranslation } from "react-i18next";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import BibleGlossaryItem from "./BibleGlossaryItem";
import Pagination from "../ui/Pagination";
import { useGetAllTermsQuery } from "@/store/apis/glossaryApi";
import { ERROR_KEYS, Lang } from "@amen24/shared";
import GlossaryFilterForm from "./GlossaryFilterForm";
import { ThemedView } from "../ui/ThemedView";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useFeedback } from "@/hooks/useFeedback";
import LoadingIndicator from "../ui/LoadingIndicator";

const ITEMS_PER_PAGE = 10;

const BibleGlossary = () => {
  const { showError } = useFeedback();
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const lang = i18n.language as Lang;

  const isConnected = useSelector((state: RootState) => state.network.isConnected);

  useEffect(() => {
    if (!isConnected) {
      showError(ERROR_KEYS.NO_INTERNET_CONNECTION);
    }
  }, [isConnected]);

  const { data, isLoading } = useGetAllTermsQuery({
    lang,
    term: filterTerm || undefined,
    limit: ITEMS_PER_PAGE,
    page,
  }, {
    skip: !isConnected,
    refetchOnReconnect: true,
  });

  const handleFilter = () => {
    setPage(1);
    setFilterTerm(query.trim());
  };

  const handleReset = () => {
    setQuery("");
    setFilterTerm("");
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.meta.lastPage) {
      setPage(newPage);
    }
  };

  return (
    <ThemedView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <GlossaryFilterForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleFilter}
        onReset={handleReset}
      />

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={data?.data || []}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <BibleGlossaryItem bgItem={item} />}
          ListFooterComponent={() =>
            data ? (
              <Pagination
                t={t}
                lang={lang}
                page={page}
                lastPage={data.meta.lastPage}
                onPageChange={handlePageChange}
              />
            ) : null
          }
        />
      )}
    </ThemedView>
  );
};

export default BibleGlossary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    gap: 16
  }
});
