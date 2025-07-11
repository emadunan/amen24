import React, { useEffect } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useTranslation } from "react-i18next";
import { ThemedText } from "@/components/ui/ThemedText";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useGetOneTermQuery } from "@/store/apis/glossaryApi";
import { MarkdownContent } from "@/components/ui/MarkdownContent";
import { ThemedView } from "@/components/ui/ThemedView";
import BackBtn from "@/components/ui/BackBtn";

const GlossaryDetails = () => {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const navigation = useNavigation();
  const { i18n } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const { data: term, isLoading } = useGetOneTermQuery(slug);

  useEffect(() => {
    if (!term) return;

    const translation = term.translations.find((t) => t.lang === i18n.language);

    navigation.setOptions({
      headerTitle: () => (
        <ThemedText type="title">{translation?.term}</ThemedText>
      ),
      headerRight: () => <ThemedText>{term.native}</ThemedText>,
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

  const translation = term.translations.find((t) => t.lang === i18n.language);

  return (
    <ThemedView style={[styles.container]}>
      <MarkdownContent markdown={translation?.definition ?? ""} />
    </ThemedView>
  );
};

export default GlossaryDetails;

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
