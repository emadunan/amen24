import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useEffect, useState } from "react";
import { Pressable, ScrollView, StyleSheet } from "react-native";
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Colors } from "@/constants";
import { useSQLiteContext } from "expo-sqlite";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import useMobileBackBtn from "@/hooks/useBackAsExit";
import { useGetMeQuery } from "@/store/apis/authApi";
import AppLoadingScreen from "@/components/ui/AppLoadingScreen";

const BibleScreen = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themedTextStyle = {
    borderColor: colorScheme === "light" ? Colors.light.text : Colors.dark.text,
  };

  useMobileBackBtn();

  const db = useSQLiteContext();
  const { t } = useTranslation();

  const [books, setBooks] = useState<{ id: number; bookKey: string; bookLen: number }[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<{ id: number; bookKey: string; bookLen: number }>(
        `SELECT book.id, book.bookKey, COUNT(chapter.id) as bookLen 
          FROM book
          LEFT JOIN chapter ON book.id = chapter.bookId 
          GROUP BY book.id 
          ORDER BY book.id;
        `);
      setBooks(result);
    }
    setup();
  }, []);


  const { isLoading } = useGetMeQuery();
  if (isLoading) return <AppLoadingScreen />;


  function handlePress(b: { id: number; bookKey: string; bookLen: number }) {
    router.push(`/(tabs)/bible/${b.bookKey}?bookId=${b.id}&bookLen=${b.bookLen}&chapterNum=1`);
  }


  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {books.map((b) => (
          <Pressable onPress={() => handlePress(b)} key={b.id}>
            <ThemedText type="subtitle" style={[styles.bookText, themedTextStyle]}>
              {t(b.bookKey, { ns: "book" })}
            </ThemedText>
          </Pressable>

        ))}
      </ThemedView>
    </ScrollView>
  );
};

export default BibleScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 48,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  bookText: {
    width: 144,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 2,
    textAlign: "center",
  },
});
