import React, { useEffect } from "react";
import styles from "./VerseResult.module.css";
import { useTranslation } from "react-i18next";
import { Lang } from "@amen24/shared";

interface VerseResultProps {
  bookKey: string;
  chapterNumber: number;
  verseNumber: number;
  text: string;
  lang: Lang;
}

const VerseResult: React.FC<VerseResultProps> = ({
  bookKey,
  chapterNumber,
  verseNumber,
  text,
  lang
}) => {
  const { t, i18n } = useTranslation("book");

  // Force reload translations on lang change
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang).catch(console.error);
    }
  }, [lang, i18n]);

  return (
    <div className={styles.verseContainer} dir={lang === Lang.ENGLISH ? "ltr" : "rtl"}>
      <span className={styles.reference}>
        {t(bookKey)} {chapterNumber}:{verseNumber}
      </span>
      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default VerseResult;
