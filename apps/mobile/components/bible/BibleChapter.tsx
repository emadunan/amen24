import React, { FC, useLayoutEffect, useMemo, useState } from "react";
import { I18nManager, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { ThemedView } from "@/components/ui/ThemedView";
import { useTranslation } from "react-i18next";
import { Colors } from "@/constants";
import { useColorScheme } from "@/hooks/useColorScheme";
import BibleChapterText, {
  BibleLang,
} from "@/components/bible/BibleChapterText";
import BibleChapterSelector from "./BibleChapterSelector";
import { BookKey, Lang } from "@amen24/shared";
import { HighlightProvider } from "@amen24/store";
import * as Clipboard from "expo-clipboard";
import { ThemedText } from "../ui/ThemedText";
import { FontAwesome5, Feather } from "@expo/vector-icons";

type SearchParams = {
  bookKey: string;
  bookId: string;
  bookLen: string;
  chapterNum: string;
  v?: string;
};

const BibleChapter: FC = () => {
  const { t, i18n } = useTranslation();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];
  const params = useLocalSearchParams<SearchParams>();
  const [translationLang, setTranslationLang] = useState<BibleLang | undefined>(
    undefined,
  );
  const [translationMenuVisible, setTranslationMenuVisible] = useState(false);
  const [layoutMenuVisible, setLayoutVisible] = useState(false);
  const [textJustify, setTextJustify] = useState(true);

  const { bookKey, bookId, bookLen, chapterNum, v } = params;

  const selectedVerseIds = useMemo(() => {
    if (!v) return undefined;

    return v
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !Number.isNaN(id));
  }, [v]);

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
        style={[styles.languageToggle]}
        onPress={() => setTranslationMenuVisible((prev) => !prev)}
      >
        <FontAwesome5 name="language" size={24} color={theme.text} />
      </Pressable>

      {/* Toggle Menu */}
      {translationMenuVisible && (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: theme.background,
              borderColor: theme.primary,
            },
          ]}
        >
          <Pressable
            onPress={() => {
              setTranslationLang(undefined);
              setTranslationMenuVisible(false);
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
                setTranslationMenuVisible(false);
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
                setTranslationMenuVisible(false);
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
                setTranslationMenuVisible(false);
              }}
            >
              <ThemedText style={styles.menuItem}>
                {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.NATIVE}`)}
              </ThemedText>
            </Pressable>
          )}
        </View>
      )}

      {!translationLang && (
        <Pressable
          style={[styles.layoutToggle]}
          onPress={() => setLayoutVisible((prev) => !prev)}
        >
          {textJustify ? (
            <Feather name="align-justify" size={20} color={theme.text} />
          ) : I18nManager.isRTL ? (
            <Feather name="align-right" size={20} color={theme.text} />
          ) : (
            <Feather name="align-left" size={20} color={theme.text} />
          )}
        </Pressable>
      )}

      {layoutMenuVisible && (
        <View
          style={[
            styles.layoutMenu,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          <Pressable onPress={() => { setTextJustify((prev) => !prev); setLayoutVisible(false) }}>
            {textJustify ? (
              I18nManager.isRTL ? (
                <Feather name="align-right" size={20} color={theme.text} />
              ) : (
                <Feather name="align-left" size={20} color={theme.text} />
              )
            ) : (
              <Feather name="align-justify" size={20} color={theme.text} />
            )}
          </Pressable>
        </View>
      )}

      {/* Chapter Content */}
      <View
        key={`${i18n.language}-${bookId}-${chapterNum}`}
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
            selectedVerseIds={selectedVerseIds}
            textJustify={textJustify}
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
    marginVertical: 32,
    marginHorizontal: 16,
    display: "flex",
    flexDirection: "row",
    gap: 16,
  },
  languageToggle: {
    position: "absolute",
    top: 0,
    right: 4,
    zIndex: 100,
  },
  layoutToggle: {
    position: "absolute",
    top: 0,
    left: 4,
    zIndex: 100,
  },
  menu: {
    position: "absolute",
    top: 24,
    right: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    zIndex: 101,
    justifyContent: "center",
    alignItems: "flex-start",
    borderWidth: 1,
    borderTopStartRadius: 8,
    borderBottomEndRadius: 8,
  },
  layoutMenu: {
    position: "absolute",
    top: 24,
    left: 4,
    zIndex: 101,
  },
  menuItem: {
    paddingVertical: 6,
    fontSize: 16,
  },
});
