import React from 'react';
import {
  Pressable,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { formatNumber, Lang } from '@amen24/shared';
import { TFunction } from 'i18next';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';

interface Props {
  t: TFunction;
  lang: Lang;
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<Props> = ({ t, lang, page, lastPage, onPageChange }) => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = 1; i <= lastPage; i++) {
      if (i === 1 || i === lastPage || (i >= page - delta && i <= page + delta)) {
        range.push(i);
      }
    }

    let lastPageAdded = 0;
    for (const p of range) {
      if (typeof p === 'number') {
        if (p - lastPageAdded > 1) {
          rangeWithDots.push('...');
        }
        rangeWithDots.push(p);
        lastPageAdded = p;
      }
    }

    return rangeWithDots;
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <ThemedView style={styles.paginationRow}>
          <Pressable
            style={[styles.pageButton, { borderColor: theme.primary }]}
            onPress={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            <ThemedText style={{ color: theme.text }}>{t('main.prev')}</ThemedText>
          </Pressable>

          {getPageNumbers().map((p, index) =>
            p === '...' ? (
              <ThemedText key={`ellipsis-${index}`} style={[styles.ellipsis, { color: theme.text }]}>...
              </ThemedText>
            ) : (
              <Pressable
                key={p}
                onPress={() => onPageChange(Number(p))}
                style={[styles.pageButton, page === p && { borderColor: theme.primary, backgroundColor: theme.primary }]}
              >
                <ThemedText style={{ color: page === p ? 'white' : theme.text }}>
                  {formatNumber(Number(p), lang)}
                </ThemedText>
              </Pressable>
            )
          )}

          <Pressable
            style={[styles.pageButton, { borderColor: theme.primary }]}
            onPress={() => onPageChange(page + 1)}
            disabled={page >= lastPage}
          >
            <ThemedText style={{ color: theme.text }}>{t('main.next')}</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    alignItems: 'center',
  },
  paginationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pageButton: {
    borderWidth: 1,
    borderRadius: 2,
    paddingVertical: 6,
    paddingHorizontal: 10,
    marginHorizontal: 4,
  },
  activePage: {},
  ellipsis: {
    paddingHorizontal: 8,
    fontSize: 16,
  },
});


export default Pagination;