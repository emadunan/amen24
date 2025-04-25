"use client";

import styles from "./LanguageSelector.module.css";
import i18nConfig from "@/config/next-i18n-router.config";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUpdateProfileMutation } from "@/store/userApi";
import { useBreakpoint, useClickOutside, showToast } from "@amen24/ui";
import { Lang } from "@amen24/shared";
import { useGetMeQuery } from "@/store/authApi";

const langMap = {
  en: "EN",
  ar: "ع",
  // he: "עב",
  // fr: "FR",
  // de: "DE",
  // es: "ES",
  // it: "IT",
  // pt: "PT",
  // ru: "РУ",
  // zh: "中",
  // ja: "日",
  // ko: "한",
  // tr: "TR",
  // fa: "فا",
  // ur: "ار",
  // hi: "हि",
  // bn: "ব",
  // id: "ID",
  // ms: "MS",
  // th: "TH",
  // nl: "NL",
  // sv: "SV",
  // no: "NO",
  // da: "DA",
  // fi: "FI",
  // pl: "PL",
  // cs: "CS",
  // hu: "HU",
  // ro: "RO",
  // el: "ΕΛ",
  // uk: "УК",
  // vi: "VI",
  // sr: "СР",
  // hr: "HR",
  // bg: "БГ",
  // sk: "SK",
  // sl: "SL",
  // lt: "LT",
  // lv: "LV",
  // et: "ET",
  // tl: "TL",
  // sw: "SW",
};

const flagMap: Record<string, string> = {
  en: "🇺🇸",
  ar: "🇦🇪",
  he: "🇮🇱",
  fr: "🇫🇷",
  de: "🇩🇪",
  es: "🇪🇸",
  it: "🇮🇹",
  pt: "🇵🇹",
  ru: "🇷🇺",
  zh: "🇨🇳",
  ja: "🇯🇵",
  ko: "🇰🇷",
  tr: "🇹🇷",
  fa: "🇮🇷",
  ur: "🇵🇰",
  hi: "🇮🇳",
  bn: "🇧🇩",
  id: "🇮🇩",
  ms: "🇲🇾",
  th: "🇹🇭",
  nl: "🇳🇱",
  sv: "🇸🇪",
  no: "🇳🇴",
  da: "🇩🇰",
  fi: "🇫🇮",
  pl: "🇵🇱",
  cs: "🇨🇿",
  hu: "🇭🇺",
  ro: "🇷🇴",
  el: "🇬🇷",
  uk: "🇺🇦",
  vi: "🇻🇳",
  sr: "🇷🇸",
  hr: "🇭🇷",
  bg: "🇧🇬",
  sk: "🇸🇰",
  sl: "🇸🇮",
  lt: "🇱🇹",
  lv: "🇱🇻",
  et: "🇪🇪",
  tl: "🇵🇭",
  sw: "🇰🇪",
};

type LangMapKey = keyof typeof langMap;

const LanguageSelector = () => {
  const { i18n, t } = useTranslation(["lang", "error"]);
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasSetLanguage = useRef(false);
  const { data: user } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const { isTablet } = useBreakpoint();
  const [mounted, setMounted] = useState(false);

  useClickOutside(dropdownRef, isOpen, setIsOpen);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!user?.profile) return;

    if (!user.profile.uiLang) {
      updateProfile({ uiLang: i18n.language as Lang })
        .unwrap()
        .catch((err: unknown) => {
          console.error(err);
          showToast(t("error:failedToChangeLanguage"), "error");
        });
      return;
    }

    if (
      user?.profile?.uiLang &&
      user?.profile?.uiLang !== i18n.language &&
      !hasSetLanguage.current
    ) {
      hasSetLanguage.current = true;
      handleLanguageChange(user.profile.uiLang, false);
    }
  }, [user?.profile?.uiLang, i18n.language]);

  async function handleLanguageChange(
    newLocale: string,
    shouldUpdateBackend = true,
  ) {
    if (newLocale === i18n.language) return;

    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    if (user?.id && shouldUpdateBackend) {
      try {
        await updateProfile({ uiLang: newLocale as Lang }).unwrap();
      } catch (error) {
        console.error(error);
        showToast(t("error:failedToChangeLanguage"), "error");
      }
    }

    const targetPath =
      currentLocale === i18nConfig.defaultLocale && !i18nConfig.prefixDefault
        ? "/" + newLocale + currentPathname
        : currentPathname.replace(`/${currentLocale}`, `/${newLocale}`);

    router.push(targetPath);
    router.refresh();
  }

  return (
    <div className={styles.languageChanger} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {!mounted
          ? ""
          : isTablet
          ? langMap[currentLocale as LangMapKey]
          : `${flagMap[currentLocale]} ${t(`lang:${currentLocale}`)}`}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {Object.keys(langMap).map((code) => (
            <button
              key={code}
              className={styles.option}
              disabled={currentLocale === code}
              onClick={() => handleLanguageChange(code)}
            >
              {mounted &&
                (isTablet ? (
                  langMap[code as LangMapKey]
                ) : (
                  <>
                    {flagMap[code]} {t(`lang:${code}`)}
                  </>
                ))}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
