import React, { FC } from "react";
import { useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

interface Props {
  bookKey: string;
  bookId: string;
  bookLen: string;
  currentChapter: string;
  navigation: any;
}

const BookDrawerContent: FC<Props> = ({
  bookKey,
  bookId,
  bookLen,
  navigation,
}) => {
  const chapters = Array.from({ length: parseInt(bookLen) }, (_, i) => i + 1);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text style={styles.header}>{bookKey}</Text> */}
      <View style={styles.chapterList}>
        {chapters.map((chapter) => {
          const router = useRouter();

          function handlePress() {
            navigation.closeDrawer();
            router.push(
              `/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${chapter}`,
            );
          }

          return (
            <Pressable
              onPress={handlePress}
              key={chapter}
              style={({ pressed }) => [
                styles.chapterItem,
                pressed && styles.pressedItem,
              ]}
            >
              <Text style={styles.chapterText}>Chapter {chapter}</Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5dc", // Creamy background
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffcc00", // Dark yellow text
    marginBottom: 16,
  },
  chapterList: {
    gap: 8, // Space between chapter items
  },
  chapterItem: {
    padding: 12,
    backgroundColor: "#fff8e1", // Light cream for the item background
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    elevation: 2, // Subtle shadow for elevation
  },
  chapterText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#654321", // Dark yellow text
  },
  pressedItem: {
    backgroundColor: "#ffe4b2", // Slightly darker cream on press
  },
});

export default BookDrawerContent;
