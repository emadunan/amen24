import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@amen24/shared";
import { useColorScheme } from "@/hooks/useColorScheme";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, ViewStyle, } from "react-native";

interface Props {
  label: string;
  value: string;
  selected: string;
  onPress: (value: string) => void;
}

const RadioBtn: FC<Props> = ({ label, value, selected, onPress }) => {
  const colorScheme = useColorScheme();
  const { t, i18n } = useTranslation();

  const selectedTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].text,
  };

  const flexDirStyle: ViewStyle = i18n.language === "ar" ? { flexDirection: "row-reverse" } : { flexDirection: "row" };

  return (
    <Pressable style={[styles.radioContainer, flexDirStyle]} onPress={() => onPress(value)}>
      <ThemedView
        style={[styles.radioCircle, selected === value && selectedTheme]}
      />
      <ThemedText style={styles.radioText}>
        {t(`${label}`, { ns: "lang" })}
      </ThemedText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  radioContainer: {
    alignItems: "center",
    marginVertical: 5,
    gap: 8,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  radioText: {
    fontSize: 16,
  },
});

export default RadioBtn;
