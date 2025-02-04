import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { FC, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { I18nManager, Platform, Pressable, StyleSheet } from 'react-native';
import * as Updates from "expo-updates";
import { useNavigation } from 'expo-router';


interface RadioButtonProps {
  label: string;
  value: string;
  selected: string;
  onPress: (value: string) => void;
}

const RadioButton: FC<RadioButtonProps> = ({ label, value, selected, onPress }) => {
  const colorScheme = useColorScheme();
  const { t } = useTranslation();

  const selectedTheme = {
    backgroundColor: Colors[colorScheme ?? "light"].text,
  }
  return <Pressable style={styles.radioContainer} onPress={() => onPress(value)}>
    <ThemedView style={[styles.radioCircle, selected === value && selectedTheme]} />
    <ThemedText style={styles.radioText}>{t(label, { ns: "lang" })}</ThemedText>
  </Pressable>
};


const LocaleScreen = () => {
  const { t, i18n } = useTranslation();
  const [selected, setSelected] = useState(i18n.language);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: t("locale")
    })
  }, [navigation, i18n.language]);

  const isRtl = i18n.language === "ar";

  async function handleLocale(newLanguage: string) {
    setSelected(newLanguage);
    i18n.changeLanguage(newLanguage);

    if (isRtl !== I18nManager.isRTL && Platform.OS !== 'web') {

      I18nManager.allowRTL(isRtl);
      I18nManager.forceRTL(isRtl);

      if (!__DEV__) {
        // Only run in production
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

  return (
    <ThemedView style={styles.container}>
      <ThemedView>
        <RadioButton label="en" value="en" selected={selected} onPress={handleLocale} />
        <RadioButton label="ar" value="ar" selected={selected} onPress={handleLocale} />
      </ThemedView>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  radioContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 8,
  },
  radioText: {
    fontSize: 16,
  },
});

export default LocaleScreen