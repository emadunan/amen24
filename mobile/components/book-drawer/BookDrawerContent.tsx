import React, { FC } from "react";
import { FlatList } from "react-native";
import ChapterLink from "./ChapterLink";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
  bookKey: string;
  bookId: string;
  bookLen: string;
  currentChapter: string;
  navigation: DrawerNavigationHelpers;
}

const BookDrawerContent: FC<Props> = (props) => {
  const chapters = Array.from(
    { length: parseInt(props.bookLen) },
    (_, i) => i + 1,
  );

  return (
  <ThemedView style={{flex: 1}}>
    <FlatList data={chapters} renderItem={({ item }) => <ChapterLink key={item} chapter={item} {...props} />} />
  </ThemedView>
  );
};

export default BookDrawerContent;
