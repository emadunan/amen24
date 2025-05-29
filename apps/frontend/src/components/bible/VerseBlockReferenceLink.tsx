import Link from 'next/link';
import React, { useMemo } from 'react';
import styles from './VerseBlockReferenceLink.module.css';
import { BookMap, Featured, Lang, formatNumber } from '@amen24/shared';

interface Props {
  featured: Featured;
  lang: Lang;
}

const VerseBlockReferenceLink: React.FC<Props> = ({ featured, lang }) => {
  const verseGroup = featured.verseGroup;
  const verses = verseGroup.verses;
  const startingVerse = verseGroup.startingVerse;
  const chapter = startingVerse.chapter;
  const bookKey = chapter.book.bookKey;
  const chapterNum = chapter.num;
  const totalChapters = BookMap[bookKey].len;

  const blockLength = verses.length;
  const firstVerseNum = startingVerse.num;
  const lastVerseNum = verses[verses.length - 1]?.num;

  const formattedChapterNum = formatNumber(chapterNum, lang);
  const formattedFirstVerseNum = formatNumber(firstVerseNum, lang);
  const formattedLastVerseNum = formatNumber(lastVerseNum ?? -1, lang);

  const verseIdsQuery = useMemo(() => {
    const ids = verses.map(v => v.id).join(',');
    return `v=${ids}`;
  }, [verses]);

  return (
    <Link
      className={styles.reference}
      href={`/${bookKey}/${chapterNum}/${totalChapters}?${verseIdsQuery}`}
    >
      &mdash; {BookMap[bookKey].title[lang as 'en' | 'ar']}{" "}
      {formattedChapterNum} : {formattedFirstVerseNum}
      {blockLength > 1 && ` - ${formattedLastVerseNum}`}
    </Link>
  );
};

export default VerseBlockReferenceLink;
