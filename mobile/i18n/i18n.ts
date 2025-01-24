import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import commonEn from "./locales/en/common.json";
import commonAr from "./locales/ar/common.json";

const resources = {
  en: {
    common: commonEn,
  },
  ar: {
    common: commonAr,
  },
};

type Resources = typeof resources;

i18n.use(initReactI18next).init<Resources>({
  resources,
  fallbackLng: "en",
  lng: Localization.getLocales()[0].languageCode ?? "en",
  defaultNS: 'common',
  ns: ['common']
});

export default i18n;
