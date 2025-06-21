import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import { locales } from "@amen24/shared";

import * as Localization from "expo-localization";


const resources = {
  en: {
    common: locales.en.common,
    book: locales.en.book,
    lang: locales.en.lang,
  },
  ar: {
    common: locales.ar.common,
    book: locales.ar.book,
    lang: locales.ar.lang,
  },
};

type Resources = typeof resources;

i18n.use(initReactI18next).init<Resources>({
  resources,
  fallbackLng: "en",
  // lng: Localization.getLocales()?.[0]?.languageCode ?? "en",
  lng: I18nManager.isRTL ? "ar" : "en",
  defaultNS: "common",
  ns: ["common", "book", "lang"],
});

export default i18n;
