import React, { FC } from "react";
import { FlatList } from "react-native";
import ChapterLink from "./ChapterLink";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";

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
    <FlatList data={chapters} renderItem={({ item }) => <ChapterLink key={item} chapter={item} {...props} />} />
  );
};

export default BookDrawerContent;
