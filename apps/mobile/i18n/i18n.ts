// i18n/index.ts
import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";
import { I18nManager } from "react-native";
import { locales } from "@amen24/shared";

type Language = keyof typeof locales;
type Namespace = keyof (typeof locales)["en"];

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((lang: Language, ns: Namespace) =>
      Promise.resolve(locales[lang][ns]),
    ),
  ).init({
    debug: __DEV__,
    // You can also try Localization.locale
    // lng: Localization.getLocales()?.[0]?.languageCode ?? "en"
    // lng: Localization.locale.split("-")[0] as Language
    lng: I18nManager.isRTL ? "ar" : "en",
    fallbackLng: "en",
    defaultNS: "common",
    ns: ["common", "book", "lang", "message"],
    interpolation: {
      escapeValue: false,
    },
    compatibilityJSON: "v4",
    initImmediate: false,
  });

export default i18n;
