import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import translationEn from "./locales/en.json";
import translationAr from "./locales/ar.json";

const resources = {
  en: {
    translation: translationEn,
  },
  ar: {
    translation: translationAr,
  },
};

type Resources = typeof resources;

i18n.use(initReactI18next).init<Resources>({
  resources,
  fallbackLng: "en",
  lng: Localization.getLocales()[0].languageCode ?? "en",
});

export default i18n;
