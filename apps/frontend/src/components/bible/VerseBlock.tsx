import { BookKey, BookMap, formatNumber, Lang, Verse } from "@amen24/shared";
import { MdDeleteForever } from "react-icons/md";
import styles from "./VerseBlock.module.css";
import Link from "next/link";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

interface VerseBlockProps {
  bookKey: BookKey;
  chapterNum: number;
  totalChapters: number;
  verseNum: number;
  verses: Verse[];
  lang: Lang;
  onRemove?: () => void;
}

const VerseBlock: React.FC<VerseBlockProps> = ({
  bookKey,
  chapterNum,
  totalChapters,
  verseNum,
  verses,
  lang,
  onRemove,
}) => {
  const { t } = useTranslation();
  const blockLength = verses.length;
  const lastVerseNum = verses[verses.length - 1].num;
  const formattedChapterNum = formatNumber(chapterNum, lang);
  const formattedVerseNum = formatNumber(verseNum, lang);
  const formattedLastVerseNum = formatNumber(lastVerseNum || -1, lang);

  const verseIdsQuery = useMemo(() => {
    return verses.map((v) => `v=${v.id}`).join("&");
  }, [verses]);

  return (
    <div
      className={styles.verseContainer}
      dir={lang === Lang.ENGLISH ? "ltr" : "rtl"}
    >
      <p>
        {useMemo(() => {
          return verses
            .map((verse, idx, arr) => {
              const currentText = verse.verseTranslations[0].textDiacritized;
              if (idx === 0) return currentText;

              const prevNum = arr[idx - 1].num;
              const isSequential = verse.num === prevNum + 1;

              return (isSequential ? " " : " .. ") + currentText;
            })
            .join("");
        }, [verses])}
      </p>

      <div className={styles.actions}>
        <Link
          className={styles.reference}
          href={`/${bookKey}/${chapterNum}/${totalChapters}?${verseIdsQuery}`}
        >
          &mdash; {BookMap[bookKey].title[lang as Lang.ARABIC | Lang.ENGLISH]}{" "}
          {formattedChapterNum} : {formattedVerseNum}{" "}
          {blockLength > 1 && ` - ${formattedLastVerseNum}`}
        </Link>
        {onRemove && (
          <button className={styles.removeButton} onClick={onRemove}>
            <MdDeleteForever size="1.3rem" />
            {t("remove")}
          </button>
        )}
      </div>
    </div>
  );
};

export default VerseBlock;
