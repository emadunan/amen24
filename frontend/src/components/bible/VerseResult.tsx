import React from "react";
import styles from "./VerseResult.module.css";
import { BookKey, BookMap, formatNumber, Lang } from "@amen24/shared";
import Link from "next/link";

interface VerseResultProps {
  bookKey: BookKey;
  chapterNo: number;
  totalChapters: number;
  verseNo: number;
  text: string;
  lang: Lang;
}

const VerseResult: React.FC<VerseResultProps> = ({
  bookKey,
  chapterNo,
  totalChapters,
  verseNo,
  text,
  lang,
}) => {
  const formattedChapterNo = formatNumber(chapterNo, lang);
  const formattedVerseNo = formatNumber(verseNo, lang);

  return (
    <div
      className={styles.verseContainer}
      dir={lang === Lang.ENGLISH ? "ltr" : "rtl"}
    >
      <p className={styles.text}>{text}</p>
      <Link
        className={styles.reference}
        href={`/${bookKey}/${chapterNo}/${totalChapters}?v=${verseNo}`}
      >
        &mdash; {BookMap[bookKey].title[lang as Lang.ARABIC | Lang.ENGLISH]}{" "}
        {formattedChapterNo} : {formattedVerseNo}
      </Link>
    </div>
  );
};

export default VerseResult;
