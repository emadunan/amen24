import React from 'react';
import { I18nManager, Platform, Pressable } from 'react-native';
import { IconSymbol } from '../ui/IconSymbol';
import i18n from '@/i18n/i18n';
import RNRestart from "react-native-restart";
import * as SplashScreen from 'expo-splash-screen';


const LocaleSelector = () => {

  async function handleLocale() {
    await SplashScreen.preventAutoHideAsync();

    const newLanguage = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLanguage);

    const isRtl = newLanguage === "ar";

    // if (isRtl !== I18nManager.isRTL && Platform.OS !== 'web') {}
    I18nManager.allowRTL(isRtl);
    I18nManager.forceRTL(isRtl);

    RNRestart.restart();
  }

  return (
    <Pressable onPress={handleLocale}>
      <IconSymbol size={28} name="language" color={"#fff"} />
    </Pressable>
  )
}

export default LocaleSelector