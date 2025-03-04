'use client';

import styles from "./LanguageSelector.module.css";
import i18nConfig from '@/config/next-i18n-router.config';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  function handleClick(newLocale: string) {
    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div className={styles.languageChanger}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {currentLocale === "ar" ? "🇪🇬" : "🇺🇸"} {t(currentLocale, { ns: "lang" })}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          <button className={styles.option} disabled={currentLocale === "en"} onClick={() => handleClick("en")}>🇺🇸 {t("en", { ns: "lang" })}</button>
          <button className={styles.option} disabled={currentLocale === "ar"} onClick={() => handleClick("ar")}>🇪🇬 {t("ar", { ns: "lang" })}</button>
        </div>
      )}
    </div>
  );
}

export default LanguageSelector;