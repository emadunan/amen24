import {
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { IVerse } from "@/interfaces/verse";
import VerseSearchResult from "@/components/bible/VerseSearchResult";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

function detectLanguage(text: string): "ar" | "en" {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

export default function SearchScreen() {
  const db = useSQLiteContext();
  const { i18n, t } = useTranslation();
  const [verses, setVerses] = useState<IVerse[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryLang, setQuerylang] = useState(i18n.language);

  const colorScheme = useColorScheme();

  function handleQuery(inputText: string) {
    setQuery(inputText);
  }

  async function handleSearch() {
    if (!query.trim() || query.trim().length < 3) return;

    const language = detectLanguage(query);
    setQuerylang(language);

    const table = language === "ar" ? "versesAr" : "versesEn";
    const attribute = language === "ar" ? "textNormalized" : "text";

    try {
      const result = await db.getAllAsync<IVerse>(
        `SELECT ${table}.id, ${table}.num as verseNum, ${table}.text, chapters.num as chapterNum, books.key as bookKey FROM ${table} LEFT JOIN chapters ON ${table}.chapterId = chapters.id LEFT JOIN books ON chapters.bookId = books.id WHERE ${attribute} LIKE ?`,
        [`%${query}%`], // Correctly passing the search term
      );

      setVerses(result);
    } catch (error) {
      console.error("Search error:", error);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.searchGroup}>
        <ThemedTextInput
          style={styles.searchInput}
          value={query}
          onChangeText={handleQuery}
        />
        <Pressable style={styles.searchBtn} onPress={handleSearch}>
          <Feather name="search" size={32} color={Colors[colorScheme ?? "light"].text} />
        </Pressable>
      </ThemedView>
      <ThemedView>
        <FlatList
          style={styles.versesList}
          data={verses}
          renderItem={({ item }) => (
            <VerseSearchResult v={item} queryLang={queryLang} />
          )}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchGroup: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 1,
  },
  searchBtn: {
    marginLeft: 8,
  },
  versesList: {
    paddingHorizontal: 16,
    marginBottom: 74,
  }
});
