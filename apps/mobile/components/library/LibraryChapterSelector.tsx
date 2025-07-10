import React, { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "@/constants";
import { ThemedText } from "../ui/ThemedText";
import { useNavigation } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";

interface Props {
  title: string;
}

const LibraryChapterSelector: FC<Props> = ({ title }) => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Pressable
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
      >
        <ThemedText numberOfLines={1}
          ellipsizeMode="tail" style={[styles.chapterTitle, { color: theme.primary }]}>
          {title}
        </ThemedText>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 2,
    paddingHorizontal: 4,
    marginHorizontal: 8,
    marginVertical: 8
  },
  chapterTitle: {
    fontSize: 20,
    lineHeight: 32,
  }
});

export default LibraryChapterSelector;