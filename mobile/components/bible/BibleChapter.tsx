import React, { FC, useLayoutEffect } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import BibleChapterEn from "@/components/bible/BibleChapterEn";
import BibleChapterAr from "@/components/bible/BibleChapterAr";
import { useTranslation } from "react-i18next";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";

const BibleChapter: FC = () => {
  const { t, i18n } = useTranslation();
  const { key, bookId, bookLen, chapterNum } = useLocalSearchParams<{
    key: string;
    bookId: string;
    bookLen: string;
    chapterNum: string;
  }>();

  const colorScheme = useColorScheme();

  const router = useRouter();
  const navigation = useNavigation();

  function handleNextChapter() {
    const nextChapterNum = parseInt(chapterNum) + 1;
    const bookLength = parseInt(bookLen);

    if (nextChapterNum > bookLength) return;

    router.push(
      `/(tabs)/bible/${key}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${nextChapterNum}`,
    );
  }

  function handlePrevChapter() {
    const prevChapterNum = parseInt(chapterNum) - 1;

    if (prevChapterNum < 1) return;

    router.push(
      `/(tabs)/bible/${key}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${prevChapterNum}`,
    );
  }

  const chapterNumContainerTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };
  const chapterNumTextTheme = {
    color: Colors[colorScheme ?? "light"].primary,
  };

  useLayoutEffect(() => {
    if (key) {
      navigation.setOptions({
        title: (
          <Text style={{ color: Colors[colorScheme ?? "light"].primary }}>
            {t(key, { ns: "book" }).toLocaleUpperCase()}
          </Text>
        ),
        headerRight: () => (
          <View style={styles.chapterGroup}>
            <Pressable onPress={handlePrevChapter}>
              <AntDesign
                name="caretleft"
                size={24}
                color={Colors[colorScheme ?? "light"].background}
              />
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.dispatch(DrawerActions.openDrawer());
              }}
              style={[styles.chapterNumContainer, chapterNumContainerTheme]}
            >
              <Text style={[styles.chapterNumText, chapterNumTextTheme]}>
                {chapterNum}
              </Text>
            </Pressable>
            <Pressable onPress={handleNextChapter}>
              <AntDesign
                name="caretright"
                size={24}
                color={Colors[colorScheme ?? "light"].background}
              />
            </Pressable>
          </View>
        ),
      });
    }
  }, [key, chapterNum, t]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView>
        <View key={`${bookId}-${chapterNum}`} style={styles.chapterContainer}>
          {i18n.language === "ar" ? (
            <BibleChapterAr bookId={bookId} chapterNum={chapterNum} />
          ) : (
            <BibleChapterEn bookId={bookId} chapterNum={chapterNum} />
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
};

export default BibleChapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chapterGroup: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
  },
  chapterNumContainer: {
    width: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  chapterNumText: {
    fontSize: 20,
  },
  chapterContainer: {
    padding: 16,
  },
});
