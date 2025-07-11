import React, { FC } from "react";
import { FlatList } from "react-native";
import { DrawerNavigationHelpers } from "@react-navigation/drawer/lib/typescript/commonjs/src/types";
import { ThemedView } from "../ui/ThemedView";
import LibraryChapterLink from "./LibraryChapterLink";
import { LibraryChapter } from "@amen24/shared";
import { current } from "@reduxjs/toolkit";

interface Props {
  slug: string;
  current: string;
  chapters: LibraryChapter[];
  navigation: DrawerNavigationHelpers;
}

const LibraryBookDrawerContent: FC<Props> = (props) => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <FlatList
        data={props.chapters}
        renderItem={({ item }) => (
          <LibraryChapterLink
            key={item.id}
            slug={props.slug}
            current={props.current}
            chapter={item}
            navigation={props.navigation}
          />
        )}
      />
    </ThemedView>
  );
};

export default LibraryBookDrawerContent;
