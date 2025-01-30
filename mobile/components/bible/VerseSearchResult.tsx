import { IVerse } from "@/interfaces/verse";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

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
    <View key={v.id} style={[styles.verseContainer, isRtlQuery && rtlStyles]}>
      <Text style={styles.verseText}>{v.text}</Text>
      <Text style={styles.verseRef}>
        ({t(v.bookKey, { ns: "book", lng: queryLang })}{" "}
        {queryLang === "ar"
          ? Number(v.chapterNum).toLocaleString("ar-EG")
          : v.chapterNum}{" "}
        :{" "}
        {queryLang === "ar"
          ? Number(v.verseNum).toLocaleString("ar-EG")
          : v.verseNum}
        )
      </Text>
    </View>
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
    lineHeight: 26,
    textAlign: "justify",
  },
  verseRef: {
    fontSize: 18,
    lineHeight: 26,
    flexWrap: "nowrap",
    textAlign: "center",
  },
});

export default VerseSearchResult;
