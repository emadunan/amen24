import {
  View,
  Text,
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
} from "@amen24/shared";
import { useGetMeQuery } from "@/store/apis/authApi";
import { useHighlightContext } from "@amen24/store";
import { ThemedView } from "../ThemedView";
import { useGetUserLastReadProgressQuery, useUpdateProgressMutation } from "@/store/apis/progressApi";
import { useAddFavoriteMutation } from "@/store/apis/favoriteApi";
import { useAddToFeaturedMutation } from "@/store/apis/featuredApi";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Colors } from "@/constants";
import { ThemedText } from "../ThemedText";

const TOOLBOX_WIDTH = 180;
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
  const colorScheme = useColorScheme();
  const toolboxBgColor = Colors[colorScheme ?? "light"].secondary;
  const btnBgColor = Colors[colorScheme ?? "light"].background;

  const { t } = useTranslation();
  const window = Dimensions.get("window");

  const offsetX = useRef(40);
  const offsetY = useRef(200);

  const { data: user } = useGetMeQuery();
  const { data: progress } = useGetUserLastReadProgressQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [addFeatured] = useAddToFeaturedMutation();
  const [updateProgress] = useUpdateProgressMutation();

  const { highlighted, clearHighlighted, copyHighlighted } =
    useHighlightContext();
  const [isExpanded, setIsExpanded] = useState(true);
  const lastHighlighted = highlighted.at(-1);
  const pan = useRef(new Animated.ValueXY({ x: 40, y: 200 })).current;

  // Add this right after pan is created:
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

        // Clamp X and Y
        const clampedX = Math.max(0, Math.min(newX, window.width - TOOLBOX_WIDTH));
        const clampedY = Math.max(0, Math.min(newY, window.height - TOOLBOX_HEIGHT));

        pan.setValue({ x: clampedX - offsetX.current, y: clampedY - offsetY.current });
      },

      onPanResponderRelease: (_, gestureState) => {
        offsetX.current += I18nManager.isRTL ? -gestureState.dx : gestureState.dx;
        offsetY.current += gestureState.dy;
        pan.extractOffset();
      },
    })
  ).current;

  if (!highlighted.length) return null;

  const handleCopy = () => {    
    copyHighlighted(verses, chapterNum, bookKey);
  };

  const handleAddFavorite = async () => {
    try {
      console.log(highlighted);
      
      await addFavorite(highlighted).unwrap();
      console.log(t(MESSAGE_KEYS.ADDED_TO_FAVORITES));
    } catch (error) {
      console.error(error);
      console.log(t(ERROR_KEYS.UNKNOWN_ERROR));
    }
  };

  const handleAddFeatured = async () => {
    try {
      await addFeatured(highlighted).unwrap();
      console.log(t(MESSAGE_KEYS.ADDED_TO_FEATURED));
    } catch (error) {
      console.error(error);
      console.log(t(ERROR_KEYS.UNKNOWN_ERROR));
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
      console.log(t("toolbox.lastReadSaved"));
    } catch (error) {
      console.error(error);
      console.log(t(ERROR_KEYS.UNKNOWN_ERROR));
    }
  };

  return (
    <Animated.View
      style={[styles.wrapper, pan.getLayout()]}
      {...panResponder.panHandlers}
    >
      <ThemedView style={[styles.toolbox, { backgroundColor: toolboxBgColor }]}>
        <View
          style={[
            styles.toolboxHeader,
          ]}
        >
          <MaterialIcons name="drag-indicator" size={24} style={styles.dragIcon} />

          <ThemedText type="title" style={styles.title}>{t("toolbox.title")}</ThemedText>

          <View style={styles.iconGroup}>
            <Pressable onPress={() => setIsExpanded(prev => !prev)}>
              {isExpanded ? <Ionicons name="chevron-up" size={18} style={styles.headerBtn} /> : <Ionicons name="chevron-down" size={18} style={styles.headerBtn} />}
            </Pressable>
            <Pressable onPress={clearHighlighted}>
              <Ionicons name="close" size={18} style={styles.headerBtn} />
            </Pressable>
          </View>
        </View>

        {isExpanded && (
          <ScrollView contentContainerStyle={styles.container}>
            <Pressable style={[styles.btn, { backgroundColor: btnBgColor }]} onPress={handleCopy}>
              <ThemedText>📋 {t("toolbox.copy")}</ThemedText>
            </Pressable>

            {user && (
              <>
                <Pressable style={[styles.btn, { backgroundColor: btnBgColor }]} onPress={handleAddFavorite}>
                  <ThemedText>⭐ {t("toolbox.addToFavorites")}</ThemedText>
                </Pressable>

                <Pressable style={[styles.btn, { backgroundColor: btnBgColor }]} onPress={handleUpdateProgress}>
                  <ThemedText>📍 {t("toolbox.progress")}</ThemedText>
                </Pressable>

                {hasPermission(
                  user.profile.roles,
                  Permission.MANAGE_FEATURED
                ) && (
                    <Pressable
                      style={[styles.btn, { backgroundColor: btnBgColor }]}
                      onPress={handleAddFeatured}
                    >
                      <ThemedText>✨ {t("toolbox.addToFeatured")}</ThemedText>
                    </Pressable>
                  )}
              </>
            )}

            <Pressable style={[styles.btn, { backgroundColor: btnBgColor }]} onPress={clearHighlighted}>
              <ThemedText>🧽 {t("toolbox.clearHighlighting")}</ThemedText>
            </Pressable>
          </ScrollView>
        )}
      </ThemedView>
    </Animated.View>
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
    borderColor: "#888",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: 200,
  },
  toolboxHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  dragIcon: {
    marginHorizontal: 4,
  },
  iconGroup: {
    flexDirection: "row",
    gap: 4,
  },
  headerBtn: {
    borderWidth: 1
  },
  title: {
    flex: 1,
    fontSize: 16,
    textAlign: "center",
  },
  closeText: {
    fontSize: 14,
  },
  container: {
    gap: 4,
  },
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 3,
    marginBottom: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
});

export default BibleChapterToolbox;
