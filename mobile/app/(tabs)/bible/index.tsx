import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useEffect, useState } from 'react'
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useColorScheme } from "../../../hooks/useColorScheme";
import { Colors } from '@/constants/Colors';
import { useSQLiteContext } from 'expo-sqlite';
import { useRouter } from 'expo-router';


const Bible = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const themedTextStyle = {
    borderColor: colorScheme === "light" ? Colors.light.tint : Colors.dark.tint,
  }

  const db = useSQLiteContext();

  const [books, setBooks] = useState<{ id: number, key: string }[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<{ id: number, key: string }>('SELECT * FROM books');
      setBooks(result);

    }
    setup();
  }, []);

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {books.map(b => <Pressable onPress={() => {
          console.log(b.id)
          router.push(`/(tabs)/bible/${b.id}`);
        }} key={b.id}><ThemedText style={[styles.bookText, themedTextStyle]}>{b.key}</ThemedText></Pressable>)}
      </ThemedView>
    </ScrollView>
  )
}

export default Bible;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center"
  },
  bookText: {
    width: 132,
    margin: 8,
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    fontWeight: "bold",
    textAlign: "center"
  }
});