import { createInstance, i18n, Resource } from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";
import resourcesToBackend from "i18next-resources-to-backend";
import i18nConfig from "@/config/next-i18n-router.config";
import { locales } from "@amen24/shared";

export default async function initTranslations(
  locale: string,
  namespaces: string[],
  i18nInstance?: i18n,
  resources?: Resource,
): Promise<{ i18n: i18n; resources: Resource; t: i18n["t"] }> {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  type Language = keyof typeof locales;
  type Namespace = keyof typeof locales["en"];

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend((lang: Language, ns: Namespace) => Promise.resolve(locales[lang][ns]))
    )
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: namespaces[0],
    fallbackNS: namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
}
