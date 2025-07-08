import React from "react";
import styles from "./VerseResult.module.css";
import { BookKey, BookMap, formatNumber, getDirection, Lang } from "@amen24/shared";
import Link from "next/link";
import VerseResultText from "./VerseResultText";

interface VerseResultProps {
  bookKey: BookKey;
  chapterNum: number;
  totalChapters: number;
  verseNum: number;
  verseId: number;
  text: string;
  lang: Lang;
  queryTerms: string[];
}

const VerseResult: React.FC<VerseResultProps> = ({
  bookKey,
  chapterNum,
  totalChapters,
  verseNum,
  verseId,
  text,
  lang,
  queryTerms,
}) => {
  const formattedChapterNum = formatNumber(chapterNum, lang);
  const formattedVerseNum = formatNumber(verseNum, lang);

  return (
    <div className={styles.verseContainer} dir={getDirection(lang)}>
      <VerseResultText text={text} queryTerms={queryTerms} />
      <Link
        className={styles.reference}
        href={`/bible/${bookKey}/${chapterNum}/${totalChapters}?v=${verseId}`}
      >
        &mdash; {BookMap[bookKey].title[lang as Lang.ARABIC | Lang.ENGLISH]}{" "}
        {formattedChapterNum} : {formattedVerseNum}
      </Link>
    </div>
  );
};

export default VerseResult;
