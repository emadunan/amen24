import React from "react";
import styles from "./VerseResult.module.css";
import { useTranslation } from "react-i18next";
import { BookKey, BookKeys, formatNumber, Lang } from "@amen24/shared";
import Link from "next/link";

interface VerseResultProps {
  bookId: number;
  bookKey: BookKey;
  chapterNumber: number;
  totalChapters: number;
  verseNumber: number;
  text: string;
  lang: Lang;
}

const VerseResult: React.FC<VerseResultProps> = ({
  bookId,
  bookKey,
  chapterNumber,
  totalChapters,
  verseNumber,
  text,
  lang,
}) => {
  console.log(lang);

  const { t } = useTranslation("book", { lng: lang });

  const formattedChapterNumber = formatNumber(chapterNumber, lang);
  const formattedVerseNumber = formatNumber(verseNumber, lang);

  return (
    <div
      className={styles.verseContainer}
      dir={lang === Lang.ENGLISH ? "ltr" : "rtl"}
    >
      <p className={styles.text}>{text}</p>
      <Link
        target="_blank"
        className={styles.reference}
        href={`/${bookId}/${bookKey}/${totalChapters}/${chapterNumber}?v=${verseNumber}`}
      >
        &mdash; {BookKeys[bookKey].title[lang as Lang.ARABIC | Lang.ENGLISH]}{" "}
        {formattedChapterNumber} : {formattedVerseNumber}
      </Link>
    </div>
  );
};

export default VerseResult;
