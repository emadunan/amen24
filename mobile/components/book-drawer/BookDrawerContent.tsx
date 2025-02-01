import React, { FC } from "react";
import { ScrollView, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "@/constants/Colors";
import ChapterLink from "./ChapterLink";

interface Props {
  bookKey: string;
  bookId: string;
  bookLen: string;
  currentChapter: string;
  navigation: any;
}

const BookDrawerContent: FC<Props> = (props) => {
  const chapters = Array.from(
    { length: parseInt(props.bookLen) },
    (_, i) => i + 1,
  );

  const colorScheme = useColorScheme();

  const containerTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerTheme]}>
      {chapters.map((chapter) => (
        <ChapterLink key={chapter} chapter={chapter} {...props} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});

export default BookDrawerContent;
