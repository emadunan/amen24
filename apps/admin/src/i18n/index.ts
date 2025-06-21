import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";
import { locales } from "@amen24/shared";

type Language = keyof typeof locales;
type Namespace = keyof (typeof locales)["en"];

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((lang: Language, ns: Namespace) =>
      Promise.resolve(locales[lang][ns]),
    ),
  )
  .init({
    debug: import.meta.env.DEV,
    ns: [
      "common",
      "error",
      "message",
      "book",
      "month",
      "lang",
      "privacy",
      "terms",
    ],
    defaultNS: "common",
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    initImmediate: true,
  });
