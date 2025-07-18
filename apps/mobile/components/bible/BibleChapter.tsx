import React, { FC, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Dimensions, I18nManager, Pressable, StyleSheet, Text, View } from "react-native";
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
import ChapterAudioPlayer from "../ui/ChapterAudioPlayer";

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
  const { width: screenWidth } = Dimensions.get("window");

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
      {/* Menus Backdrop */}
      {(translationMenuVisible || layoutMenuVisible) && (
        <Pressable
          onPress={() => {
            setTranslationMenuVisible(false);
            setLayoutVisible(false);
          }}
          style={styles.backdrop}
        />
      )}
      <ThemedView style={[styles.displaySettings, { borderColor: theme.secondary }]}>
        {/* LEFT: Translation Button */}
        <View style={styles.leftControls}>
          {!translationLang && (
            <Pressable
              style={[{ backgroundColor: theme.background }]}
              onPress={() => setLayoutVisible((prev) => !prev)}
            >
              {textJustify ? (
                <Feather name="align-justify" size={23} color={theme.text} />
              ) : I18nManager.isRTL ? (
                <Feather name="align-right" size={23} color={theme.text} />
              ) : (
                <Feather name="align-left" size={23} color={theme.text} />
              )}
            </Pressable>
          )}
        </View>

        {/* CENTER: Audio Player (absolutely centered) */}
        <View style={[styles.audioCenter, { left: screenWidth / 2 - 39 }]}>
          <ChapterAudioPlayer
            key={`${bookId}-${bookKey}-${chapterNum}`}
            bookId={bookId}
            bookKey={bookKey}
            chapterNum={chapterNum}
          />
        </View>

        {/* RIGHT: Language Icon */}
        <View style={styles.rightControls}>
          <Pressable
            style={[{ backgroundColor: theme.background }]}
            onPress={() => setTranslationMenuVisible((prev) => !prev)}
          >
            <FontAwesome5 name="language" size={24} color={theme.text} />
          </Pressable>
        </View>
      </ThemedView>


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

      {layoutMenuVisible && (
        <View
          style={[
            styles.layoutMenu,
            {
              backgroundColor: theme.background,
              borderColor: theme.secondary,
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
    flex: 1,
    flexDirection: "row",
    gap: 16,
  },
  displaySettings: {
    paddingHorizontal: 16,
    height: 44,
    borderTopWidth: 1,
    // borderBottomWidth: 1,
    justifyContent: "center",
  },
  leftControls: {
    position: "absolute",
    left: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  rightControls: {
    position: "absolute",
    right: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  audioCenter: {
    position: "absolute",
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    position: "absolute",
    top: 32,
    right: 16,
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
    top: 32,
    left: 16,
    zIndex: 101,
    borderWidth: 1,
  },
  menuItem: {
    paddingVertical: 6,
    fontSize: 16,
  }, backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    zIndex: 100,
  },
});
