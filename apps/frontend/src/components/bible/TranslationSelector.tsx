"use client";

import { RootState } from "@/store";
import { Lang } from "@amen24/shared";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./TranslationSelector.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setTranslationLang } from "@/store/slices/translationSlice";

const TranslationSelector = () => {
  const { i18n, t } = useTranslation();
  const lang = useSelector((state: RootState) => state.translation.lang);
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (lang: Lang) => {
    dispatch(setTranslationLang(lang));
    setIsOpen(false);
  };

  return (
    <div className={styles.translations}>
      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        {lang
          ? `${t(`lang:${i18n.language}`)} | ${t(`lang:${lang}`)}`
          : t("chapter.showTranslation")}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {i18n.language !== Lang.VOID && (
            <button
              className={styles.option}
              disabled={lang === Lang.VOID}
              onClick={() => handleChange(Lang.VOID)}
            >
              {t("chapter.hideTranslation")}
            </button>
          )}

          {i18n.language !== Lang.ARABIC && (
            <button
              className={styles.option}
              disabled={lang === Lang.ARABIC}
              onClick={() => handleChange(Lang.ARABIC)}
            >
              {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.ARABIC}`)}
            </button>
          )}
          {i18n.language !== Lang.ENGLISH && (
            <button
              className={styles.option}
              disabled={lang === Lang.ENGLISH}
              onClick={() => handleChange(Lang.ENGLISH)}
            >
              {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.ENGLISH}`)}
            </button>
          )}
          {i18n.language !== Lang.NATIVE && (
            <button
              className={styles.option}
              disabled={lang === Lang.NATIVE}
              onClick={() => handleChange(Lang.NATIVE)}
            >
              {t(`lang:${i18n.language}`)} | {t(`lang:${Lang.NATIVE}`)}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TranslationSelector;
