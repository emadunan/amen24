import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React from 'react'
import { ScrollView, StyleSheet } from 'react-native';
import data from "../../data/books.json";
import { useColorScheme } from "../../hooks/useColorScheme";
import { Colors } from '@/constants/Colors';

const Bible = () => {
  const colorScheme = useColorScheme();
  const themedTextStyle = {
    borderColor: colorScheme === "light" ? Colors.light.tint : Colors.dark.tint,
  }

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {data.map(b => <ThemedText key={b.title} style={[styles.bookText, themedTextStyle]}>{b.title}</ThemedText>)}
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