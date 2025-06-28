import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { useAddFavoriteMutation } from "@/store/apis/favoriteApi";
import { useAddToFeaturedMutation } from "@/store/apis/featuredApi";
import { useGetUserLastReadProgressQuery, useUpdateProgressMutation } from "@/store/apis/progressApi";
import { useGetMeQuery } from "@/store/apis/authApi";
import { hasPermission, Permission, formatNumber, Lang, MESSAGE_KEYS, ERROR_KEYS, BookKey, Verse } from "@amen24/shared";
import { useHighlightContext } from "@amen24/store";

interface Props {
  bookKey: BookKey;
  chapterNum: number;
  verses: Verse[];
}

const ChapterToolbox: React.FC<Props> = ({bookKey, chapterNum, verses}) => {
  const { t, i18n } = useTranslation();
  const { data: progress } = useGetUserLastReadProgressQuery();
  const { highlighted, clearHighlighted, copyHighlighted } = useHighlightContext();
  const [isExpanded, setIsExpanded] = useState(true);

  const { data: user } = useGetMeQuery();
  const [addFavorite] = useAddFavoriteMutation();
  const [addFeatured] = useAddToFeaturedMutation();
  const [updateProgress] = useUpdateProgressMutation();

  const lastHighlighted = highlighted.at(-1);
  if (!highlighted.length) return null;

  const handleCopy = () => {
    copyHighlighted(verses, chapterNum, bookKey); // uses the same logic from context
    setIsExpanded(false);
  };

  const handleAddFavorite = async () => {
    try {
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
        id: progress?.id,
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
    <Modal transparent visible={highlighted.length > 0} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.toolbox}>
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.title}>{t("toolbox.title")}</Text>
          </TouchableOpacity>

          {isExpanded && (
            <ScrollView contentContainerStyle={styles.container}>
              <TouchableOpacity style={styles.btn} onPress={handleCopy}>
                <Text>📋 {t("toolbox.copy")}</Text>
              </TouchableOpacity>

              {user && (
                <>
                  <TouchableOpacity style={styles.btn} onPress={handleAddFavorite}>
                    <Text>⭐ {t("toolbox.addToFavorites")}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.btn} onPress={handleUpdateProgress}>
                    <Text>📍 {t("toolbox.progress")}</Text>
                  </TouchableOpacity>

                  {hasPermission(user.profile.roles, Permission.MANAGE_FEATURED) && (
                    <TouchableOpacity style={styles.btn} onPress={handleAddFeatured}>
                      <Text>✨ {t("toolbox.addToFeatured")}</Text>
                    </TouchableOpacity>
                  )}
                </>
              )}

              <TouchableOpacity style={styles.btn} onPress={clearHighlighted}>
                <Text>🧽 {t("toolbox.clearHighlighting")}</Text>
              </TouchableOpacity>
            </ScrollView>
          )}

          <TouchableOpacity style={styles.closeBtn} onPress={clearHighlighted}>
            <Text style={styles.closeText}>✖</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-end",
  },
  toolbox: {
    backgroundColor: "#fff",
    padding: 10,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 10,
  },
  container: {
    paddingBottom: 10,
  },
  btn: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  closeBtn: {
    position: "absolute",
    top: 10,
    right: 20,
  },
  closeText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChapterToolbox;
