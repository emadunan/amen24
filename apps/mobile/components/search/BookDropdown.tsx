import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { useTranslation } from "react-i18next";
import { books, categoryList } from "@amen24/shared";
import { FontAwesome } from "@expo/vector-icons";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { Colors } from "@/constants";

interface Props {
  selectedBooks: string[];
  toggleBookSelection: (book: string) => void;
  isCategorySelected: (category: string) => boolean;
}

const BookDropdown: React.FC<Props> = ({
  selectedBooks,
  toggleBookSelection,
  isCategorySelected,
}) => {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <ThemedView style={[styles.dropdown, { borderColor: theme.text }]}>
      <ScrollView style={styles.bookList}>
        <ThemedView style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {Object.keys(categoryList).map((category) => (
            <TouchableOpacity
              key={category}
              style={styles.option}
              onPress={() => toggleBookSelection(category)}
            >
              <ThemedView style={styles.checkboxIcon}>
                {isCategorySelected(category) ? (
                  <FontAwesome
                    name="check-square"
                    size={24}
                    color={theme.text}
                  />
                ) : (
                  <FontAwesome name="square-o" size={24} color={theme.text} />
                )}
              </ThemedView>
              <ThemedText style={styles.optionText}>
                {t(`book:${category}`)}
              </ThemedText>
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
              <ThemedView style={styles.checkboxIcon}>
                {selectedBooks.includes(book) ? (
                  <FontAwesome
                    name="check-square"
                    size={24}
                    color={theme.text}
                  />
                ) : (
                  <FontAwesome name="square-o" size={24} color={theme.text} />
                )}
              </ThemedView>
              <ThemedText style={styles.optionText}>
                {t(`book:${book}`)}
              </ThemedText>
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
    borderBottomWidth: 1,
  },
  bookList: {
    paddingVertical: 8,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 8,
    width: 128,
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
