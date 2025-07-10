import {
  ActivityIndicator,
  FlatList,
  I18nManager,
  Keyboard,
  Pressable,
  StyleSheet,
} from "react-native";
import { ThemedView } from "@/components/ui/ThemedView";
import { Feather } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { VerseWithMeta } from "@/interfaces/verse";
import VerseSearchResult from "@/components/bible/VerseSearchResult";
import { ThemedTextInput } from "@/components/ui/ThemedTextInput";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ui/ThemedText";
import { buildVerseSearchQuery } from "@/db/queries";
import { Lang, BookKey, MESSAGE_KEYS, normalizeArText, removeArDiacritics, removeNaDiacritics, replaceWaslaAlef, categoryList } from "@amen24/shared";
import { showToast } from "@/lib/toast";
import BookDropdown from "@/components/search/BookDropdown";

function detectLanguage(text: string): "ar" | "en" {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

export default function SearchScreen() {
  const db = useSQLiteContext();
  const { i18n, t } = useTranslation();
  const [verses, setVerses] = useState<VerseWithMeta[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryLang, setQuerylang] = useState(i18n.language);
  const [loading, setLoading] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<string[]>(Object.values(BookKey));
  const [showDropdown, setShowDropdown] = useState(false);

  const isWholeBibleSelected =
    selectedBooks.length === Object.values(BookKey).length;

  const isCategorySelected = (category: string) =>
    categoryList[category]?.every((book) => selectedBooks.includes(book));

  const toggleBookSelection = (book: string) => {
    if (book === "WholeBible") {
      setSelectedBooks(
        isWholeBibleSelected ? [] : [...Object.values(BookKey)]
      );
      return;
    }

    const selectedSet = new Set(selectedBooks);

    if (Object.values(BookKey).includes(book as BookKey)) {
      // Toggle single book selection
      if (selectedSet.has(book)) {
        selectedSet.delete(book);
      } else {
        selectedSet.add(book);
      }
    } else if (categoryList[book]) {
      // Toggle category selection
      const allBooksInCategory = new Set(categoryList[book]);
      const allSelected = categoryList[book].every((b) => selectedSet.has(b));

      if (allSelected) {
        allBooksInCategory.forEach((b) => selectedSet.delete(b));
      } else {
        allBooksInCategory.forEach((b) => selectedSet.add(b));
      }
    }

    setSelectedBooks(Array.from(selectedSet));
  };

  const lastQueryRef = useRef<string>("");

  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? 'light'];

  function handleQuery(inputText: string) {
    setQuery(inputText);
  }

  const backgroundTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].secondary,
  };

  async function handleSearch() {
    setShowDropdown(false);

    if (!query.trim() || query.trim().length < 3) {
      showToast("info", MESSAGE_KEYS.SEARCH_KEYWORD_TOO_SHORT)
      return;
    }

    Keyboard.dismiss();

    let text = query;
    let textNormalized = query;

    setLoading(true);
    setSearchPerformed(true);
    setVerses([]);

    const language = detectLanguage(query);
    setQuerylang(language);

    if (language === Lang.ARABIC) {
      text = replaceWaslaAlef(text);
      text = removeArDiacritics(text);
      textNormalized = normalizeArText(text);
    }

    lastQueryRef.current = text ?? '';

    try {
      const { sql, params } = buildVerseSearchQuery({
        lang: language,
        query: textNormalized ?? '',
        selectedBooks,
      });

      const result = await db.getAllAsync<VerseWithMeta>(sql, params);
      setVerses(result);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={[styles.searchGroup, backgroundTheme]}>
        <Pressable style={styles.filterBtn} onPress={() => setShowDropdown(prev => !prev)}>
          <Feather
            name="filter"
            size={24}
            color={Colors[colorScheme ?? "light"].accent}
            style={I18nManager.isRTL && styles.flipIcon}
          />
        </Pressable>
        <ThemedTextInput
          style={styles.searchInput}
          value={query}
          onChangeText={handleQuery}
        />
        <Pressable style={[styles.searchBtn, { backgroundColor: theme.accent }]} onPress={handleSearch}>
          <Feather
            name="search"
            size={32}
            color={Colors[colorScheme ?? "light"].background}
            style={I18nManager.isRTL && styles.flipIcon}
          />
        </Pressable>
      </ThemedView>
      {showDropdown && <BookDropdown selectedBooks={selectedBooks} toggleBookSelection={toggleBookSelection} isCategorySelected={isCategorySelected} />}
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
  container: {
    flex: 1,
  },
  searchGroup: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 32,
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
  filterBtn: {
    position: "absolute",
    top: 41,
    left: 24,
    zIndex: 2
  },
  searchBtn: {
    position: "absolute",
    top: 35,
    right: 19,
    borderRadius: 2,
    padding: 2
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
    lineHeight: 48
  },
});
