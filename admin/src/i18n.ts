import i18n from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend((language: string, namespace: string) =>
      import(`@amen24/shared/dist/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    debug: import.meta.env.DEV,
    ns: ["common", "error", "message", "book", "month", "lang", "privacy", "terms"],
    defaultNS: "common",
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
    initImmediate: true,
  });