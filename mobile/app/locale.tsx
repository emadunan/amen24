import { ThemedView } from "@/components/ThemedView";
import React, { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { I18nManager, Platform, StyleSheet, ViewStyle } from "react-native";
import * as Updates from "expo-updates";
import { useNavigation } from "expo-router";
import BackBtn from "@/components/ui/BackBtn";
import RadioBtn from "@/components/ui/RadioBtn";

const LocaleScreen = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ title: t("locale") });
  }, [t, navigation]);

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

  const backBtnDirStyle: ViewStyle =
    i18n.language === "ar" ? { right: 0 } : { left: 0 };

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
      <BackBtn uri={homeUri} style={[styles.backBtn, backBtnDirStyle]} />
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
  },
});

export default LocaleScreen;
