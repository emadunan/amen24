import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import BibleGlossaryItem from './BibleGlossaryItem';
import Pagination from '../ui/Pagination';
import { useGetAllTermsQuery } from '@/store/apis/glossaryApi';
import { Lang } from '@amen24/shared';
import GlossaryFilterForm from './GlossaryFilterForm';
import { ThemedView } from '../ThemedView';

const ITEMS_PER_PAGE = 10;

const BibleGlossary = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [page, setPage] = useState(1);

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];
  const lang = i18n.language as Lang;

  const { data, isLoading } = useGetAllTermsQuery({
    lang,
    term: filterTerm || undefined,
    limit: ITEMS_PER_PAGE,
    page,
  });

  const handleFilter = () => {
    setPage(1);
    setFilterTerm(query.trim());
  };

  const handleReset = () => {
    setQuery('');
    setFilterTerm('');
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.meta.lastPage) {
      setPage(newPage);
    }
  };

  return (
    <ThemedView style={[styles.container, { backgroundColor: theme.background }]}>
      <GlossaryFilterForm
        query={query}
        onQueryChange={setQuery}
        onSubmit={handleFilter}
        onReset={handleReset}
      />

      {isLoading ? (
        <ActivityIndicator size="large" color={theme.primary} style={styles.loader} />
      ) : (
        <FlatList
          data={data?.data || []}
          keyExtractor={(item) => item.id.toString()}
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
    padding: 16,
  },
  loader: {
    marginTop: 32,
  },
});
