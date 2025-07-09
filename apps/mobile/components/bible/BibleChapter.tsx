import React, { FC, useLayoutEffect, useState } from "react";
import {
  I18nManager,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import BibleChapterText, { BibleLang } from "@/components/bible/BibleChapterText";
import BibleChapterSelector from "./BibleChapterSelector";
import { BookKey, Lang } from "@amen24/shared";
import { HighlightProvider } from "@amen24/store";
import * as Clipboard from "expo-clipboard";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { ThemedText } from "../ThemedText";

type SearchParams = {
  bookKey: string;
  bookId: string;
  bookLen: string;
  chapterNum: string;
  verseNum?: string;
};

const BibleChapter: FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const params = useLocalSearchParams<SearchParams>();
  const [translationLang, setTranslationLang] = useState<BibleLang | undefined>(undefined);
  const [menuVisible, setMenuVisible] = useState(false);

  const { bookKey, bookId, bookLen, chapterNum, verseNum } = params;

  useLayoutEffect(() => {
    if (bookKey) {
      navigation.setOptions({
        title: (
          <Text style={{ color: theme.primary }}>
            {t(bookKey, { ns: "book" }).toLocaleUpperCase()}
          </Text>
        ),
        headerRight: () => (
          <BibleChapterSelector
            chapterNum={chapterNum}
            bookId={bookId}
            bookLen={bookLen}
            bookKey={bookKey}
          />
        ),
      });
    }
  }, [bookKey, chapterNum, t, I18nManager.isRTL, colorScheme]);

  return (
    <ThemedView style={styles.container}>
      {/* Language Toggle Button */}
      <Pressable
        style={styles.languageToggle}
        onPress={() => setMenuVisible(prev => !prev)}
      >
        <FontAwesome5 name="language" size={24} color={theme.text} />
      </Pressable>

      {/* Toggle Menu */}
      {menuVisible && (
        <View style={styles.menu}>
          <Pressable
            onPress={() => {
              setTranslationLang(undefined);
              setMenuVisible(false);
            }}
          >
            <ThemedText style={styles.menuItem}>
              {t("chapter.hideTranslation")}
            </ThemedText>
          </Pressable>
          {i18n.language !== Lang.ARABIC && (
            <Pressable
              onPress={() => {
                setTranslationLang(Lang.ARABIC);
                setMenuVisible(false);
              }}
            >
              <ThemedText style={styles.menuItem}>
                {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.ARABIC}`)}
              </ThemedText>
            </Pressable>
          )}

          {i18n.language !== Lang.ENGLISH && (
            <Pressable
              onPress={() => {
                setTranslationLang(Lang.ENGLISH);
                setMenuVisible(false);
              }}
            >
              <ThemedText style={styles.menuItem}>
                {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.ENGLISH}`)}
              </ThemedText>
            </Pressable>
          )}

          {i18n.language !== Lang.NATIVE && (
            <Pressable
              onPress={() => {
                setTranslationLang(Lang.NATIVE);
                setMenuVisible(false);
              }}
            >
              <ThemedText style={styles.menuItem}>
                {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.NATIVE}`)}
              </ThemedText>
            </Pressable>
          )}
        </View>
      )}

      {/* Chapter Content */}
      <View
        key={`${i18n.language}-${bookId}-${chapterNum}-${translationLang ?? 'none'}`}
        style={styles.chapterContainer}
      >
        <HighlightProvider
          language={i18n.language}
          t={t}
          copyToClipboard={(text: string) => Clipboard.setStringAsync(text)}
        >
          <BibleChapterText
            uiLang={i18n.language as BibleLang}
            translationLang={translationLang}
            bookKey={bookKey as BookKey}
            bookId={bookId}
            chapterNum={chapterNum}
            verseNum={verseNum}
          />
        </HighlightProvider>
      </View>
    </ThemedView>
  );
};

export default BibleChapter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chapterContainer: {
    margin: 16,
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  languageToggle: {
    position: "absolute",
    top: -20,
    zIndex: 100,
    left: "50%",
    transform: [{ translateX: 16 }],
  },
  menu: {
    position: "absolute",
    top: 2,
    left: "50%",
    transform: [{ translateX: 55 }],
    backgroundColor: "#fff",
    borderRadius: 2,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 101,
    justifyContent: "center",
    alignItems: "center"
  },
  menuItem: {
    paddingVertical: 6,
    fontSize: 16,
    color: "#333",
  },
});
