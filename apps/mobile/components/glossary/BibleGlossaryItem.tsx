import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useTranslation } from "react-i18next";
import { useRouter } from "expo-router";
import { ApprovalStatus, BibleGlossary } from "@amen24/shared";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "../ui/ThemedText";

interface Props {
  bgItem: BibleGlossary;
}

const BibleGlossaryItem: React.FC<Props> = ({ bgItem }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const translation = bgItem.translations.find((bgt) => bgt.lang === lang);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: theme.secondary, borderColor: theme.primary },
      ]}
      onPress={() => router.push(`/glossary/${bgItem.slug}`)}
    >
      <ThemedText type="title" style={[styles.term, { color: theme.primary }]}>
        {" "}
        {translation?.term} [{bgItem.native}]
      </ThemedText>
      <ThemedText
        numberOfLines={2}
        ellipsizeMode="tail"
        style={[styles.definition, { color: theme.text }]}
      >
        {bgItem.approvalStatus === ApprovalStatus.Approved
          ? translation?.definition
          : (translation?.oldDefinition ?? "")}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 2,
    padding: 12,
  },
  term: {
    fontSize: 20,
    lineHeight: 40,
    marginBottom: 4,
  },
  definition: {
    fontSize: 18,
    lineHeight: 32,
  },
});

export default BibleGlossaryItem;
