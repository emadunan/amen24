import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { books, categoryList } from "@amen24/shared";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
  selectedBooks: string[];
  toggleBookSelection: (book: string) => void;
  isCategorySelected: (category: string) => boolean;
}

const BookDropdown: React.FC<Props> = ({ selectedBooks, toggleBookSelection, isCategorySelected }) => {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.dropdown}>
      <ScrollView style={styles.bookList}>
        <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Object.keys(categoryList).map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.option}
              onPress={() => toggleBookSelection(category)}
            >
              <View style={styles.checkboxIcon}>
                {isCategorySelected(category) ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square-o" size={24} color="black" />
                )}
              </View>
              <ThemedText style={styles.optionText}>{t(`book:${category}`)}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>

        <View style={styles.separator} />

        <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {books.map((book) => (
            <TouchableOpacity
              key={book}
              style={styles.option}
              onPress={() => toggleBookSelection(book)}
            >
              <View style={styles.checkboxIcon}>
                {selectedBooks.includes(book) ? (
                  <FontAwesome name="check-square" size={24} color="black" />
                ) : (
                  <FontAwesome name="square-o" size={24} color="black" />
                )}
              </View>
              <ThemedText style={styles.optionText}>{t(`book:${book}`)}</ThemedText>
            </TouchableOpacity>
          ))}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 2,
    padding: 10,
    maxHeight: 400,
    borderBottomWidth: 1
  },
  bookList: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  checkboxIcon: {
    marginRight: 8,
  },
  optionText: {
    fontSize: 16,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginVertical: 8,
  },
});


export default BookDropdown;
