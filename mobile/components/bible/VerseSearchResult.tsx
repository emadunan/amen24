import { IVerse } from "@/interfaces/verse";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";

interface Props {
  v: IVerse;
  queryLang: string;
}

const VerseSearchResult: FC<Props> = ({ v, queryLang }) => {
  const { t } = useTranslation();

  const isRtlQuery: boolean = queryLang === "ar";

  const rtlStyles = {
    direction: "rtl" as "rtl" | "ltr",
  };

  return (
    <ThemedView key={v.id} style={[styles.verseContainer, isRtlQuery && rtlStyles]}>
      <ThemedText style={styles.verseText}>{v.text}</ThemedText>
      <ThemedText style={styles.verseRef}>
        ({" "}{t(v.bookKey, { ns: "book", lng: queryLang })}{" "}
        {queryLang === "ar"
          ? Number(v.chapterNum).toLocaleString("ar-EG")
          : v.chapterNum}{" "}
        :{" "}
        {queryLang === "ar"
          ? Number(v.verseNum).toLocaleString("ar-EG")
          : v.verseNum}
        {" "})
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  verseContainer: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    gap: 8,
  },
  verseText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: "justify",
  },
  verseRef: {
    flexWrap: "nowrap",
    textAlign: "center",
  },
});

export default VerseSearchResult;
