import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  Keyboard,
  Pressable,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { IVerse } from "@/interfaces/verse";
import VerseSearchResult from "@/components/bible/VerseSearchResult";
import { ThemedTextInput } from "@/components/ThemedTextInput";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { normalizeArabicText } from "@/utils";

function detectLanguage(text: string): "ar" | "en" {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

export default function SearchScreen() {
  const db = useSQLiteContext();
  const { i18n, t } = useTranslation();
  const [verses, setVerses] = useState<IVerse[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryLang, setQuerylang] = useState(i18n.language);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const lastQueryRef = useRef<string>("");

  const colorScheme = useColorScheme();

  function handleQuery(inputText: string) {
    setQuery(inputText);
  }

  const backgroundTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].secondary,
  };

  async function handleSearch() {
    if (!query.trim() || query.trim().length < 2) return;

    Keyboard.dismiss();

    const noramlizedText = normalizeArabicText(query);

    lastQueryRef.current = noramlizedText;

    setLoading(true);
    setSearchPerformed(true);
    setVerses([]); // Clear old results before fetching new ones

    const language = detectLanguage(noramlizedText);
    setQuerylang(language);

    const table = language === "ar" ? "versesAr" : "versesEn";
    const attribute = language === "ar" ? "textNormalized" : "text";

    // Normalize query and split into words
    const words = noramlizedText.trim().split(/\s+/);

    // Generate the WHERE clause with multiple LIKE conditions
    const whereClause = words.map(() => `${attribute} LIKE ?`).join(" AND ");
    const queryParams = words.map((word) => `%${word}%`);

    try {
      const result = await db.getAllAsync<IVerse>(
        `SELECT ${table}.id, ${table}.num as verseNum, ${table}.textNormalized as text, 
            chapters.num as chapterNum, books.key as bookKey, books.id as bookId, (SELECT COUNT(*) FROM chapters WHERE chapters.bookId = books.id) as bookLen 
         FROM ${table} 
         LEFT JOIN chapters ON ${table}.chapterId = chapters.id 
         LEFT JOIN books ON chapters.bookId = books.id 
         WHERE ${whereClause}`,
        queryParams,
      );

      setVerses(result);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setQuery("");
      setLoading(false); // Hide loading indicator when search is complete
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.searchGroup, backgroundTheme]}>
        <ThemedTextInput
          style={styles.searchInput}
          value={query}
          onChangeText={handleQuery}
        />
        <Pressable style={styles.searchBtn} onPress={handleSearch}>
          <Feather
            name="search"
            size={32}
            color={Colors[colorScheme ?? "light"].text}
            style={I18nManager.isRTL && styles.flipIcon}
          />
        </Pressable>
      </ThemedView>
      {loading ? (
        <ThemedView style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={Colors[colorScheme ?? "light"].primary}
          />
        </ThemedView>
      ) : searchPerformed ? (
        verses.length > 0 ? (
          <FlatList
            style={styles.versesList}
            data={verses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <VerseSearchResult
                v={item}
                queryLang={queryLang}
                query={lastQueryRef.current}
              />
            )}
          />
        ) : (
          <ThemedText style={styles.feedbackText}>
            {t("noResult", { ns: "common" })}
          </ThemedText>
        )
      ) : (
        <ThemedText style={styles.feedbackText}>
          {t("searchWelcome", { ns: "common" })}
        </ThemedText>
      )}
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
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 1,
    textAlign: "center",
  },
  searchBtn: {
    marginLeft: 8,
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
  versesList: {
    paddingHorizontal: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  feedbackText: {
    margin: 16,
    fontSize: 18,
    textAlign: "center",
  },
});
