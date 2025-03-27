"use client";

import useClickOutside from "@/hooks/useClickOutside";
import styles from "./LanguageSelector.module.css";
import i18nConfig from "@/config/next-i18n-router.config";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useChangeLangMutation, useGetMeQuery } from "@/store/userApi";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const hasSetLanguage = useRef(false); // Prevent multiple redirects

  useClickOutside(dropdownRef, isOpen, setIsOpen);
  const { data: user } = useGetMeQuery();
  const [changeLang] = useChangeLangMutation();

  useEffect(() => {
    if (
      user?.profile?.uiLang &&
      user?.profile?.uiLang !== i18n.language &&
      !hasSetLanguage.current
    ) {
      hasSetLanguage.current = true; // Prevent multiple calls
      handleLanguageChange(user.profile.uiLang, false);
    }
  }, [user?.profile.uiLang, i18n.language]);

  async function handleLanguageChange(
    newLocale: string,
    shouldUpdateBackend = true,
  ) {
    if (newLocale === i18n.language) return; // Avoid redundant updates

    // Set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Only update backend if the user is logged in
    if (user?.id && shouldUpdateBackend) {
      try {
        await changeLang(newLocale).unwrap();
      } catch (error) {
        console.error("Failed to update language:", error);
      }
    }

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`),
      );
    }

    router.refresh();
  }

  return (
    <div className={styles.languageChanger} ref={dropdownRef}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {currentLocale === "ar" ? "🇪🇬" : "🇺🇸"}{" "}
        {t(currentLocale, { ns: "lang" })}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button
            className={styles.option}
            disabled={currentLocale === "en"}
            onClick={() => handleLanguageChange("en")}
          >
            🇺🇸 {t("en", { ns: "lang" })}
          </button>
          <button
            className={styles.option}
            disabled={currentLocale === "ar"}
            onClick={() => handleLanguageChange("ar")}
          >
            🇪🇬 {t("ar", { ns: "lang" })}
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
