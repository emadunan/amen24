import React, { useLayoutEffect } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/ThemedText';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useGetOneTermQuery } from '@/store/apis/glossaryApi';
import { ThemedView } from '@/components/ThemedView';
import Marked from 'react-native-marked';
import Markdown from 'react-native-markdown-display';

const GlossaryDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const { t, i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  const { data: term, isLoading } = useGetOneTermQuery(slug);

  useLayoutEffect(() => {
    if (!term) return;

    const translation = term.translations.find(
      (t) => t.lang === i18n.language
    );

    navigation.setOptions({
      headerTitle: () => (
        <ThemedText type='title' style={{
          color: theme.primary,
          fontSize: 18,
          paddingTop: 40,
          paddingBottom: 12
        }}>
          {translation?.term} [{term.native}]
        </ThemedText>
      ),
      headerStyle: {
        backgroundColor: theme.secondary,
      },
    });
  }, [term, i18n.language]);

  if (isLoading || !term) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.primary} />
      </View>
    );
  }

  const translation = term.translations.find(t => t.lang === i18n.language);

  return (
    <View style={[styles.container, { backgroundColor: '#fff' }]}>
      <Marked value={translation?.definition ?? ''} styles={{
        text: {
          fontSize: 18,
      }}} />
    </View>
  );
};

export default GlossaryDetails;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
