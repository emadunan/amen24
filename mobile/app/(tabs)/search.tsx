import { I18nManager, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { Feather } from "@expo/vector-icons";
import { useSQLiteContext } from "expo-sqlite";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Verse {
  id: number;
  verseNum: number;
  text: string;
  chapterNum: string;
  bookKey: string;
}

function detectLanguage(text: string): "ar" | "en" {
  return /[\u0600-\u06FF]/.test(text) ? "ar" : "en";
}

export default function SearchScreen() {
  const db = useSQLiteContext();
  const { i18n, t } = useTranslation();
  const [verses, setVerses] = useState<Verse[]>([]);
  const [query, setQuery] = useState<string>("");
  const [queryLang, setQuerylang] = useState(i18n.language);

  const isRtlQuery: boolean = queryLang === "ar";

  const rtlStyles = {
    direction: "rtl" as "rtl" | "ltr",
  };


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
      const result = await db.getAllAsync<Verse>(
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
      <View style={styles.searchGroup}>
        <TextInput
          style={styles.searchInput}
          value={query}
          onChangeText={handleQuery}
        />
        <Pressable style={styles.searchBtn} onPress={handleSearch}>
          <Feather name="search" size={32} color={"black"} />
        </Pressable>
      </View>
      <View>
        {verses.map((v) => (
          <View
            key={v.id}
            style={[styles.verseContainer, isRtlQuery && rtlStyles]}
          >
            <Text style={styles.verseText}>{v.text}</Text>
            <Text style={styles.verseRef}>
              ({t(v.bookKey, { ns: "book", lng: queryLang })}{" "}
              {queryLang === "ar"
                ? Number(v.chapterNum).toLocaleString("ar-EG")
                : v.chapterNum}{" "}
              :{" "}
              {queryLang === "ar"
                ? Number(v.verseNum).toLocaleString("ar-EG")
                : v.verseNum}
              )
            </Text>
          </View>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 12,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: "#000",
  },
  searchBtn: {
    marginLeft: 8,
  },
  verseContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    gap: 8,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "justify",
  },
  verseRef: {
    fontSize: 18,
    lineHeight: 26,
    flexWrap: "nowrap",
    textAlign: "center",
  },
});
