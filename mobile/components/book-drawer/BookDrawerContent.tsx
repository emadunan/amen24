import React, { FC } from "react";
import { useRouter } from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { useTranslation } from "react-i18next";

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
  currentChapter,
  navigation,
}) => {
  const chapters = Array.from({ length: parseInt(bookLen) }, (_, i) => i + 1);

  const { t } = useTranslation();

  const colorScheme = useColorScheme();

  const containerTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };
  const headerTheme = { color: Colors[colorScheme ?? "light"].primary };
  const chapterTextTheme = {
    color: Colors[colorScheme ?? "light"].primary,
  };

  const chapterListTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  }

  const selectedChapterItemTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].primary,
  };

  const selectedChapterTextTheme = {
    color: Colors[colorScheme ?? "light"].background,
  };

  const pressedItemTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };

  return (
    <ScrollView contentContainerStyle={[styles.container, containerTheme]}>
      {/* <Text style={styles.header}>{bookKey}</Text> */}
      <View style={[styles.chapterList, chapterListTheme]}>
        {chapters.map((chapter) => {
          const router = useRouter();

          const selected = chapter.toString() === currentChapter;

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
                selected && selectedChapterItemTheme,
                pressed && pressedItemTheme,
              ]}
            >
              <Text
                style={[
                  styles.chapterText,
                  chapterTextTheme,
                  selected && selectedChapterTextTheme,
                ]}
              >
                {`${t("chapter")} ${chapter}`}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 4,
    flexGrow: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  chapterList: {
    flexGrow: 1,
  },
  chapterItem: {
    padding: 8,
    paddingLeft: 16,
    justifyContent: "center",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  chapterText: {
    fontSize: 16,
    fontWeight: "500",
  },
  pressedItem: {
    backgroundColor: "#ffe4b2", // Slightly darker cream on press
  },
});

export default BookDrawerContent;
