import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import { I18nManager } from "react-native";
import { locales } from "@/i18n/locales";

const resources = {
  en: {
    common: locales.en.common,
    book: locales.en.book,
    lang: locales.en.lang,
    ui: locales.en.ui,
  },
  ar: {
    common: locales.ar.common,
    book: locales.ar.book,
    lang: locales.ar.lang,
    ui: locales.ar.ui,
  },
};

type Resources = typeof resources;

i18n.use(initReactI18next).init<Resources>({
  resources,
  fallbackLng: "en",
  // lng: Localization.getLocales()?.[0]?.languageCode ?? "en",
  lng: I18nManager.isRTL ? "ar" : "en",
  defaultNS: "common",
  ns: ["common", "book", "lang", "ui"],
});

export default i18n;
