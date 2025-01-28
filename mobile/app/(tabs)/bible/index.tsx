import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

const Bible = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themedTextStyle = {
    borderColor: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
  };

  const db = useSQLiteContext();

  const [books, setBooks] = useState<{ id: number; key: string }[]>([]);

  const { t } = useTranslation();

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<{ id: number; key: string }>(
        "SELECT books.id, books.key, COUNT(chapters.id) as bookLen FROM books LEFT JOIN chapters ON books.id = chapters.bookId GROUP BY key ORDER BY books.id;",
      );
      setBooks(result);
    }
    setup();
  }, []);

  function handlePress(b: any) {
    router.push(
      `/(tabs)/bible/${b.key}?bookId=${b.id}&bookLen=${b.bookLen}&chapterNum=1`,
    );
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {books.map((b) => (
          <Pressable onPress={handlePress.bind(this, b)} key={b.id}>
            <ThemedText style={[styles.bookText, themedTextStyle]}>
              {t(b.key, { ns: "book" })}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>
    </ScrollView>
  );
};

export default Bible;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  bookText: {
    width: 132,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
});
