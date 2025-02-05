import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import commonEn from "./locales/en/common.json";
import commonAr from "./locales/ar/common.json";
import bookEn from "./locales/en/book.json";
import bookAr from "./locales/ar/book.json";
import langEn from "./locales/en/lang.json";
import langAr from "./locales/ar/lang.json";
import uiEn from "./locales/en/ui.json";
import uiAr from "./locales/ar/ui.json";
import { I18nManager } from "react-native";

const resources = {
  en: {
    common: commonEn,
    book: bookEn,
    lang: langEn,
    ui: uiEn,
  },
  ar: {
    common: commonAr,
    book: bookAr,
    lang: langAr,
    ui: uiAr,
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
