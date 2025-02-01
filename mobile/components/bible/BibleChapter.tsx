import React, { FC, useLayoutEffect, useState } from "react";
import {
  I18nManager,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "react-i18next";
import { DrawerActions } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import BibleChapterText from "@/components/bible/BibleChapterText";
import { useSQLiteContext } from "expo-sqlite";
import { IVerseRaw } from "@/interfaces/verse";
import * as Clipboard from "expo-clipboard"; // Import Clipboard API

const BibleChapter: FC = () => {
  const { t, i18n } = useTranslation();
  const { key, bookId, bookLen, chapterNum, verseNum } = useLocalSearchParams<{
    key: string;
    bookId: string;
    bookLen: string;
    chapterNum: string;
    verseNum?: string;
  }>();

  const colorScheme = useColorScheme();

  const db = useSQLiteContext();

  const router = useRouter();
  const navigation = useNavigation();
  const [highlighted, setHighlighted] = useState<string[]>([]);

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

  async function handleCopySelected() {
    if (highlighted.length === 0) {
      console.log("No verses selected");
      return;
    }

    const bibleLang = i18n.language === "ar" ? "Ar" : "En";

    const verses = await db.getAllAsync<IVerseRaw>(
      `SELECT text, verses${bibleLang}.num as num FROM verses${bibleLang} LEFT JOIN chapters ON chapters.id = chapterId WHERE bookId = ? AND chapters.num = ? AND verses${bibleLang}.num IN (${highlighted.map(() => "?").join(",")}) ORDER BY verses${bibleLang}.id`,
      [bookId, chapterNum, ...highlighted],
    );

    console.log(verses);

    let formattedText = "";
    let previousNum = verses[0].num - 1; // Start one number before the first verse

    for (const verse of verses) {
      if (verse.num - previousNum > 1) {
        // If there's a gap, add "..."
        formattedText += " ...";
      }
      // Append verse text
      formattedText += ` ${verse.text}`;
      previousNum = verse.num;
    }

    formattedText += ` ( ${t(key, { ns: "book" })} ${i18n.language === "ar" ? Number(chapterNum).toLocaleString("ar-EG") : chapterNum} : ${i18n.language === "ar" ? Number(verses[0].num) : verses[0].num} `;

    if (verses.length > 1) {
      formattedText += `- ${i18n.language === "ar" ? Number(verses[verses.length - 1].num) : verses[verses.length - 1].num} )`;
    } else {
      formattedText += `)`;
    }

    const content = formattedText.trim();

    await Clipboard.setStringAsync(content);
  }

  const chapterNumContainerTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].background,
  };
  const chapterNumTextTheme = {
    color: Colors[colorScheme ?? "light"].primary,
  };

  useLayoutEffect(() => {
    if (key) {
      setHighlighted([]);
      navigation.setOptions({
        title: (
          <Text style={{ color: Colors[colorScheme ?? "light"].primary }}>
            {t(key, { ns: "book" }).toLocaleUpperCase()}
          </Text>
        ),
        headerRight: () => (
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
              <Text style={[styles.chapterNumText, chapterNumTextTheme]}>
                {chapterNum}
              </Text>
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
        ),
      });
    }
  }, [key, chapterNum, t]);

  return (
    <ThemedView style={styles.container}>
      {highlighted.length > 0 && (
        <Pressable onPress={handleCopySelected}>
          <View style={styles.toolbar}>
            <AntDesign
              name="copy1"
              size={24}
              color={Colors[colorScheme ?? "light"].primary}
            />
          </View>
        </Pressable>
      )}
      <ScrollView>
        <View key={`${i18n.language}-${bookId}-${chapterNum}`} style={styles.chapterContainer}>
          {i18n.language === "ar" ? (
            <BibleChapterText
              bibleLang="Ar"
              bookId={bookId}
              chapterNum={chapterNum}
              verseNum={verseNum}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
            />
          ) : (
            <BibleChapterText
              bibleLang="En"
              bookId={bookId}
              chapterNum={chapterNum}
              verseNum={verseNum}
              highlighted={highlighted}
              setHighlighted={setHighlighted}
            />
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
  toolbar: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
