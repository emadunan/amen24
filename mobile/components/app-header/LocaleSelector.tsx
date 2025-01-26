import React from 'react';
import { I18nManager, Platform, Pressable } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';
import i18n from '@/i18n/i18n';
import * as Updates from "expo-updates";


const LocaleSelector = () => {

  async function handleLocale() {

    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);

    const isRtl = newLanguage === "ar";

    // if (isRtl !== I18nManager.isRTL && Platform.OS !== 'web') {}
    I18nManager.allowRTL(isRtl);
    I18nManager.forceRTL(isRtl);
    
    if (!__DEV__) { // Only run in production
      try {
        await Updates.reloadAsync();
      } catch (e) {
        console.error("Failed to reload app: ", e);
      }
    } else {
      console.warn("Updates.reloadAsync() does not work in Expo Go or development mode.");
    }

  }

  return (
    <Pressable onPress={handleLocale}>
      <IconSymbol size={28} name="language" color={"#fff"} />
    </Pressable>
  )
}

export default LocaleSelector