import {
  FlatList,
  I18nManager,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
} from "react-native";
import { useRef, useState } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

import { ThemedView } from "@/components/ui/ThemedView";
import { ThemedText } from "@/components/ui/ThemedText";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import VerseSearchResult from "@/components/search/VerseSearchResult";
import BookDropdown from "@/components/search/BookDropdown";
import LoadingIndicator from "@/components/ui/LoadingIndicator";
import { useFeedback } from "@/hooks/useFeedback";

import { VerseWithMeta } from "@/interfaces/verse";
import { buildVerseSearchQuery } from "@/db/queries";
import {
  Lang,
  BookKey,
  MESSAGE_KEYS,
  normalizeArText,
  removeArDiacritics,
  replaceWaslaAlef,
  categoryList,
  formatNumber,
} from "@amen24/shared";

function detectLanguage(text: string): "ar" | "en" {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

export default function SearchScreen() {
  const db = useSQLiteContext();
  const { i18n, t } = useTranslation();
  const { showMessage } = useFeedback();
  const [verses, setVerses] = useState<VerseWithMeta[]>([]);
  const [query, setQuery] = useState("");
  const [queryLang, setQuerylang] = useState(i18n.language);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>(Object.values(BookKey));
  const [showDropdown, setShowDropdown] = useState(false);

  const lastQueryRef = useRef<string>("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const isWholeBibleSelected =
    selectedBooks.length === Object.values(BookKey).length;

  const isCategorySelected = (category: string) =>
    categoryList[category]?.every((book) => selectedBooks.includes(book));

  const toggleBookSelection = (book: string) => {
    const selectedSet = new Set(selectedBooks);

    if (book === "WholeBible") {
      setSelectedBooks(isWholeBibleSelected ? [] : [...Object.values(BookKey)]);
    } else if (Object.values(BookKey).includes(book as BookKey)) {
      selectedSet.has(book) ? selectedSet.delete(book) : selectedSet.add(book);
      setSelectedBooks(Array.from(selectedSet));
    } else if (categoryList[book]) {
      const allBooksInCategory = new Set(categoryList[book]);
      const allSelected = categoryList[book].every((b) => selectedSet.has(b));
      allSelected
        ? allBooksInCategory.forEach((b) => selectedSet.delete(b))
        : allBooksInCategory.forEach((b) => selectedSet.add(b));
      setSelectedBooks(Array.from(selectedSet));
    }
  };

  const handleQuery = (text: string) => setQuery(text);

  async function handleSearch() {
    setShowDropdown(false);

    if (!query.trim() || query.trim().length < 3) {
      showMessage("info", MESSAGE_KEYS.SEARCH_KEYWORD_TOO_SHORT);
      return;
    }

    Keyboard.dismiss();
    setLoading(true);
    setSearchPerformed(true);
    setVerses([]);

    let text = query;
    let normalized = query;

    const lang = detectLanguage(query);
    setQuerylang(lang);

    if (lang === Lang.ARABIC) {
      text = replaceWaslaAlef(text);
      text = removeArDiacritics(text);
      normalized = normalizeArText(text);
    }

    lastQueryRef.current = text ?? "";

    try {
      const { sql, params } = buildVerseSearchQuery({
        lang,
        query: normalized ?? "",
        selectedBooks,
      });

      const results = await db.getAllAsync<VerseWithMeta>(sql, params);
      setVerses(results);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleSearchReset = () => {
    setQuery("");
    setShowDropdown(false);
    setSelectedBooks(Object.values(BookKey));
    setSearchPerformed(false);
    setVerses([]);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.searchContainer, { backgroundColor: theme.secondary }]}>
        <ThemedView style={[styles.searchGroupWrapper, { borderColor: theme.primary }]}>
          <Pressable
            style={styles.inlineBtn}
            onPress={() => setShowDropdown((prev) => !prev)}
          >
            <Feather
              name="filter"
              size={20}
              color={theme.primary}
              style={I18nManager.isRTL && styles.flipIcon}
            />
          </Pressable>

          <TextInput
            style={[styles.searchInput, { color: theme.text, backgroundColor: theme.background }]}
            value={query}
            onChangeText={handleQuery}
            placeholderTextColor={theme.text}
          />

          <Pressable
            style={[styles.inlineBtn, { backgroundColor: theme.primary }]}
            onPress={handleSearch}
          >
            <Feather
              name="search"
              size={20}
              color={theme.background}
              style={I18nManager.isRTL && styles.flipIcon}
            />
          </Pressable>
        </ThemedView>

        {verses.length > 0 && (
          <ThemedView style={[styles.searchReport, { backgroundColor: theme.secondary }]}>
            <ThemedText>
              {t("searchEngine.resultsCount")}:{" "}
              {formatNumber(verses.length, i18n.language as Lang)}
            </ThemedText>
            <Pressable
              onPress={handleSearchReset}
              style={[styles.resetBtn, { backgroundColor: theme.background, borderColor: theme.primary }]}
            >
              <Ionicons name="sync-sharp" size={20} color={theme.text} />
              <ThemedText>{t("searchEngine.resetSearch")}</ThemedText>
            </Pressable>
          </ThemedView>
        )}
      </ThemedView>

      {showDropdown && (
        <BookDropdown
          selectedBooks={selectedBooks}
          toggleBookSelection={toggleBookSelection}
          isCategorySelected={isCategorySelected}
        />
      )}

      {loading ? (
        <LoadingIndicator />
      ) : searchPerformed ? (
        verses.length > 0 ? (
          <FlatList
            style={styles.versesList}
            data={verses}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <VerseSearchResult
                verse={item}
                queryLang={queryLang}
                query={lastQueryRef.current}
              />
            )}
          />
        ) : (
          <ThemedText style={styles.feedbackText}>
            {t("searchEngine.noResult", { ns: "common" })}
          </ThemedText>
        )
      ) : (
        <ThemedText style={styles.feedbackText}>
          {t("main.searchWelcome", { ns: "common" })}
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: { padding: 16 },
  searchGroupWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 2,
    borderWidth: 1,
    overflow: "hidden",
    marginBottom: 12,
  },
  inlineBtn: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  searchReport: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  resetBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 2,
    gap: 8,
  },
  versesList: {
    paddingHorizontal: 16,
  },
  feedbackText: {
    margin: 16,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 48,
  },
  flipIcon: {
    transform: [{ scaleX: -1 }],
  },
});
