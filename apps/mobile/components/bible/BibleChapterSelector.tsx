import React, { FC } from "react";
import { I18nManager, Pressable, StyleSheet, View, } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "@/constants";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ThemedText } from "../ui/ThemedText";
import { useNavigation, useRouter } from "expo-router";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useTranslation } from "react-i18next";

interface Props {
  chapterNum: string;
  bookId: string;
  bookLen: string;
  bookKey: string;
}

const BibleChapterSelector: FC<Props> = ({ chapterNum, bookId, bookLen, bookKey }) => {
  const router = useRouter();
  const navigation = useNavigation();
  const { i18n } = useTranslation();

  const colorScheme = useColorScheme();

  const chapterNumContainerTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };
  const chapterNumTextTheme = {
    color: Colors[colorScheme ?? "light"].primary,
  };

  function handleNextChapter() {
    const nextChapterNum = parseInt(chapterNum) + 1;
    const bookLength = parseInt(bookLen);

    if (nextChapterNum > bookLength) return;

    router.push(
      `/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${nextChapterNum}`,
    );
  }

  function handlePrevChapter() {
    const prevChapterNum = parseInt(chapterNum) - 1;

    if (prevChapterNum < 1) return;

    router.push(
      `/(tabs)/bible/${bookKey}?bookId=${bookId}&bookLen=${bookLen}&chapterNum=${prevChapterNum}`,
    );
  }

  return (
    <View style={styles.chapterGroup}>
      <Pressable onPress={handlePrevChapter}>
        {I18nManager.isRTL ? (
          <AntDesign
            name="caretright"
            size={24}
            color={Colors[colorScheme ?? "light"].background}
          />
        ) : (
          <AntDesign
            name="caretleft"
            size={24}
            color={Colors[colorScheme ?? "light"].background}
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer());
        }}
        style={[styles.chapterNumContainer, chapterNumContainerTheme]}
      >
        <ThemedText style={[styles.chapterNumText, chapterNumTextTheme]}>
          {i18n.language === "ar"
            ? Number(chapterNum).toLocaleString("ar-EG")
            : chapterNum}
        </ThemedText>
      </Pressable>
      <Pressable onPress={handleNextChapter}>
        {I18nManager.isRTL ? (
          <AntDesign
            name="caretleft"
            size={24}
            color={Colors[colorScheme ?? "light"].background}
          />
        ) : (
          <AntDesign
            name="caretright"
            size={24}
            color={Colors[colorScheme ?? "light"].background}
          />
        )}
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  chapterGroup: {
    flexDirection: "row",
    marginHorizontal: 16,
    alignItems: "center",
  },
  chapterNumContainer: {
    width: 44,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 2,
  },
  chapterNumText: {
    fontSize: 20,
    lineHeight: 32
  }
});

export default BibleChapterSelector