import { ThemedView } from "@/components/ThemedView";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Platform, StyleSheet, useColorScheme } from "react-native";
import * as Updates from "expo-updates";
import { useNavigation } from "expo-router";
import BackBtn from "@/components/ui/BackBtn";
import RadioBtn from "@/components/ui/RadioBtn";
import { Colors } from "@/constants";

const LocaleScreen = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);
  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("locale"),
      headerStyle: {
        color: Colors[colorScheme ?? "light"].text,
        backgroundColor: Colors[colorScheme ?? "light"].background,
      },
    });
  }, [t, navigation, colorScheme]);

  async function handleLocale(newLanguage: string) {
    if (selected === newLanguage) return; // Avoid unnecessary re-renders

    setSelected(newLanguage);
    i18n.changeLanguage(newLanguage);

    const newIsRtl = newLanguage === "ar";

    if (newIsRtl !== I18nManager.isRTL && Platform.OS !== "web") {
      I18nManager.allowRTL(newIsRtl);
      I18nManager.forceRTL(newIsRtl);

      if (!__DEV__) {
        try {
          await Updates.reloadAsync();
        } catch (e) {
          console.error("Failed to reload app: ", e);
        }
      } else {
        console.warn(
          "Updates.reloadAsync() does not work in Expo Go or development mode.",
        );
      }
    }
  }

  const homeUri = "/bible";

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <RadioBtn
          label="en"
          value="en"
          selected={selected}
          onPress={handleLocale}
        />
        <RadioBtn
          label="ar"
          value="ar"
          selected={selected}
          onPress={handleLocale}
        />
      </ThemedView>
      <BackBtn uri={homeUri} style={[styles.backBtn]} color={Colors[colorScheme ?? "light"].text} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    position: "absolute",
    top: 16,
    left: 0,
  },
});

export default LocaleScreen;
