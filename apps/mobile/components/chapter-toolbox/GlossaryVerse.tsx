import React, { FC } from "react";
import {
  Text,
  Pressable,
  StyleSheet,
  ActivityIndicator,
  I18nManager,
} from "react-native";
import { BookKey, flagMap, getDirection, Lang, resolveRenderLang } from "@amen24/shared";
import { ActiveLang } from "@amen24/store";
import { useIsTermExistQuery } from "@/store/apis/glossaryApi";
import { MaterialIcons } from '@expo/vector-icons';
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";

interface Props {
  text: string;
  lang: ActiveLang;
  bookKey: BookKey;
  selectedWords: string[];
  onAddWordToTerm: (lang: ActiveLang, word: string) => void;
  onClearTerm: (lang?: ActiveLang) => void;
}

const GlossaryVerse: FC<Props> = ({
  text,
  lang,
  bookKey,
  selectedWords,
  onAddWordToTerm,
  onClearTerm,
}) => {
  const term = selectedWords.join(" ").toLowerCase();
  const shouldQuery = term.trim().length > 0;
  const words = text.trim().split(/\s+/);
  const { data: isFound, isLoading } = useIsTermExistQuery(term, {
    skip: !shouldQuery,
  });

  const renderLang: Lang = resolveRenderLang(lang, bookKey);
  const dir = getDirection(renderLang);

  const isLangRTL = dir === "rtl";
  const shouldFlipDirection = isLangRTL === I18nManager.isRTL;

  if (!text?.trim()) {
    return <ThemedText style={styles.empty}>—</ThemedText>;
  }

  return (
    <ThemedView style={styles.container}>

      <ThemedView style={styles.termRow}>
        <ThemedText style={styles.flag}>{flagMap[lang]}</ThemedText>
        <ThemedText style={styles.termText}>
          {term} {isLoading ? <ActivityIndicator size="small" /> : isFound ? <MaterialIcons name="verified" size={20} color="green" /> : null}
        </ThemedText>
        <Pressable onPress={() => onClearTerm(lang)} style={{ display: "flex", justifyContent: "center" }}>
          <MaterialIcons name="cleaning-services" size={24} color="black" style={{ marginBottom: 6, marginHorizontal: 6 }} />
        </Pressable>
      </ThemedView>

      <ThemedView
        style={[styles.wordsContainer, shouldFlipDirection ? styles.wordsRtl : styles.wordsLtr]}
      >
        {words.map((w, i) => (
          <Pressable
            key={i}
            onPress={() => onAddWordToTerm(lang, w)}
            style={styles.wordButton}
          >
            <Text
              style={[
                styles.word,
                shouldFlipDirection ? styles.textRtl : styles.textLtr,
              ]}
            >
              {w}
            </Text>
          </Pressable>
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default GlossaryVerse;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    paddingVertical: 6,
    borderWidth: 1
  },
  flag: {
    fontSize: 24,
    margin: 4,
  },
  termRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    borderBottomWidth: 1
  },
  termText: {
    fontSize: 16,
    fontWeight: "600",
  },
  wordsContainer: {
    flexWrap: "wrap",
    rowGap: 8,
    columnGap: 6,
  }, wordsRtl: {
    flexDirection: "row",
  },
  wordsLtr: {
    flexDirection: "row-reverse",
  },
  wordButton: {
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
    margin: 2,
  },
  word: {
    fontSize: 16,
  },
  textRtl: {
    textAlign: "right",
    writingDirection: "rtl", // required for Android especially
  },
  textLtr: {
    textAlign: "left",
    writingDirection: "ltr",
  },
  empty: {
    textAlign: "center",
    fontSize: 18,
    marginVertical: 16,
  },
});
