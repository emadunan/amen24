import {
  View,
  StyleSheet,
  PanResponder,
  Animated,
  ScrollView,
  I18nManager,
  Dimensions,
  Pressable,
  useColorScheme,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  hasPermission,
  Permission,
  MESSAGE_KEYS,
  ERROR_KEYS,
  BookKey,
  Verse,
  formatNumber,
  Lang,
} from "@amen24/shared";
import { useGetMeQuery } from "@/store/apis/authApi";
import {
  useGetUserLastReadProgressQuery,
  useUpdateProgressMutation,
} from "@/store/apis/progressApi";
import { useAddFavoriteMutation } from "@/store/apis/favoriteApi";
import { useAddToFeaturedMutation } from "@/store/apis/featuredApi";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants";
import { useHighlightContext } from "@amen24/store";
import { ThemedView } from "../ui/ThemedView";
import { ThemedText } from "../ui/ThemedText";
import { showToast } from "@/lib/toast";
import GlossaryModal from "./GlossaryModal";

const TOOLBOX_WIDTH = 190;
const TOOLBOX_HEIGHT = 280;

interface Props {
  bookKey: BookKey;
  chapterNum: number;
  verses: Verse[];
}

const BibleChapterToolbox: React.FC<Props> = ({
  bookKey,
  chapterNum,
  verses,
}) => {
  const { t, i18n } = useTranslation();
  const window = Dimensions.get("window");
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  const offsetX = useRef(40);
  const offsetY = useRef(200);
  const pan = useRef(new Animated.ValueXY({ x: 40, y: 200 })).current;

  const { highlighted, clearHighlighted, copyHighlighted } =
    useHighlightContext();
  const lastHighlighted = highlighted.at(-1);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isGlossaryOpen, setGlossaryOpen] = useState(false);

  const [addFavorite] = useAddFavoriteMutation();
  const [addFeatured] = useAddToFeaturedMutation();
  const [updateProgress] = useUpdateProgressMutation();

  const { data: user } = useGetMeQuery();
  const { data: progress, refetch } = useGetUserLastReadProgressQuery(
    undefined,
    { skip: !user },
  );

  const progressBookId = progress?.verse.chapter.book.id;
  const progressBookKey = progress?.verse.chapter.book.bookKey;
  const progressChapterNum = progress?.verse.chapter.num;
  const progressVerseNum = progress?.verse.num;

  useEffect(() => {
    pan.extractOffset();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gestureState) => {
        const dx = I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
        const dy = gestureState.dy;

        const newX = offsetX.current + dx;
        const newY = offsetY.current + dy;

        const clampedX = Math.max(0, Math.min(newX, window.width - TOOLBOX_WIDTH));
        const clampedY = Math.max(0, Math.min(newY, window.height - TOOLBOX_HEIGHT));

        pan.setValue({ x: clampedX - offsetX.current, y: clampedY - offsetY.current });
      },

      onPanResponderRelease: (_, gestureState) => {
        const dx = I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
        const dy = gestureState.dy;

        const newX = offsetX.current + dx;
        const newY = offsetY.current + dy;

        // Clamp to screen bounds
        offsetX.current = Math.max(0, Math.min(newX, window.width - TOOLBOX_WIDTH));
        offsetY.current = Math.max(0, Math.min(newY, window.height - TOOLBOX_HEIGHT));

        pan.flattenOffset();
        pan.setOffset({ x: offsetX.current, y: offsetY.current });
        pan.setValue({ x: 0, y: 0 });
      },
    })
  ).current;

  if (!highlighted.length) return null;

  const handleCopy = () => {
    try {
      copyHighlighted(verses, chapterNum, bookKey);

      showToast("success", MESSAGE_KEYS.COPIED_TO_CLIPBOARD);
    } catch (error) {
      showToast("error", ERROR_KEYS.UNKNOWN_ERROR);
    }

  };

  const handleAddFavorite = async () => {
    try {
      await addFavorite(highlighted).unwrap();

      showToast("success", MESSAGE_KEYS.ADDED_TO_FAVORITES);
    } catch (error) {
      console.error(error);
      showToast("error", ERROR_KEYS.UNKNOWN_ERROR);
    }
  };

  const handleAddFeatured = async () => {
    try {
      await addFeatured(highlighted).unwrap();
      showToast("success", MESSAGE_KEYS.ADDED_TO_FEATURED);
    } catch (error) {
      console.error(error);
      showToast("error", ERROR_KEYS.UNKNOWN_ERROR);
    }
  };

  const handleUpdateProgress = async () => {
    if (!user || !progress || !lastHighlighted) return;
    try {
      await updateProgress({
        id: progress.id,
        profileEmail: user.email,
        verseId: lastHighlighted,
      }).unwrap();
      showToast("success", MESSAGE_KEYS.READING_PROGRESS_SAVED);
    } catch (error) {
      console.error(error);
      showToast("error", ERROR_KEYS.UNKNOWN_ERROR);
    }
  };

  return (
    <>
      {lastHighlighted && (
        <GlossaryModal
          bookKey={"GEN" as BookKey}
          isOpen={isGlossaryOpen}
          onClose={() => setGlossaryOpen(false)}
          verseId={lastHighlighted}
        />)}
      <Animated.View style={[styles.wrapper, pan.getLayout()]} {...panResponder.panHandlers}>
        <ThemedView style={[styles.toolbox, { backgroundColor: theme.secondary }]}>
          <View style={styles.toolboxHeader}>
            <MaterialIcons name="drag-indicator" size={24} style={styles.dragIcon} />
            <ThemedText type="title" style={styles.title}>
              {t("toolbox.title")}
            </ThemedText>
            <View style={styles.iconGroup}>
              <Pressable onPress={() => setIsExpanded((prev) => !prev)}>
                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={18}
                  style={[styles.headerBtn, { borderColor: theme.primary }]}
                  color={theme.primary}
                />
              </Pressable>
              <Pressable onPress={clearHighlighted}>
                <Ionicons name="close" size={18} style={[styles.headerBtn, { borderColor: theme.primary }]} color={theme.primary} />
              </Pressable>
            </View>
          </View>

          {isExpanded && (
            <ScrollView contentContainerStyle={styles.container}>
              <Pressable style={[styles.btn, { backgroundColor: theme.background }]} onPress={handleCopy}>
                <ThemedText>📋 {t("toolbox.copy")}</ThemedText>
              </Pressable>

              {user && (
                <>
                  <Pressable style={[styles.btn, { backgroundColor: theme.background }]} onPress={handleAddFavorite}>
                    <ThemedText>⭐ {t("toolbox.addToFavorites")}</ThemedText>
                  </Pressable>

                  <Pressable style={[styles.btn, { backgroundColor: theme.background, paddingVertical: 0 }]} onPress={handleUpdateProgress}>
                    <ThemedView style={styles.progressBtnContainer}>
                      <ThemedText style={styles.progressPin} >📍</ThemedText>
                      <ThemedView style={styles.progressTextContainer}>
                        <ThemedText style={{ borderBottomColor: theme.gray, borderBottomWidth: 1 }}> {t("toolbox.progress")}</ThemedText>
                        <ThemedText style={styles.progressRefText}>{`${t(`book:${progressBookKey}`)} ${progressChapterNum && formatNumber(progressChapterNum, i18n.language as Lang)}:${progressVerseNum && formatNumber(progressVerseNum, i18n.language as Lang)}`}</ThemedText>
                      </ThemedView>
                    </ThemedView>
                  </Pressable>

                  {hasPermission(user.profile.roles, Permission.MANAGE_FEATURED) && (
                    <Pressable style={[styles.btn, { backgroundColor: theme.background }]} onPress={handleAddFeatured}>
                      <ThemedText>✨ {t("toolbox.addToFeatured")}</ThemedText>
                    </Pressable>
                  )}
                  {hasPermission(user.profile.roles, Permission.CREATE_GLOSSARY_TERM) && (
                    <Pressable style={[styles.btn, { backgroundColor: theme.background }]} onPress={() => setGlossaryOpen(true)}>
                      <ThemedText>📖 {t("toolbox.addToGlossary")}</ThemedText>
                    </Pressable>
                  )}
                </>
              )}

              <Pressable style={[styles.btn, { backgroundColor: theme.background }]} onPress={clearHighlighted}>
                <ThemedText>🧽 {t("toolbox.clearHighlighting")}</ThemedText>
              </Pressable>
            </ScrollView>
          )}
        </ThemedView>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    zIndex: 100,
  },
  toolbox: {
    padding: 10,
    borderRadius: 2,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: TOOLBOX_WIDTH,
  },
  toolboxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dragIcon: {
  },
  iconGroup: {
    flexDirection: "row",
    gap: 4,
  },
  headerBtn: {
    borderWidth: 1,
    borderRadius: 0,
  },
  title: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  container: {
    gap: 4,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  progressBtnContainer: {
    display: "flex",
    flexDirection: "row"
  },
  progressPin: {
    alignSelf: "center"
  },
  progressTextContainer: {
    flex: 1
  },
  progressRefText: {
    fontSize: 14
  }
});

export default BibleChapterToolbox;
