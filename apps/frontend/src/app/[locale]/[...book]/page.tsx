import { BookKey, ERROR_KEYS, formatNumber, Lang, Verse } from "@amen24/shared";
import React, { FC, Fragment } from "react";
import styles from "./page.module.css";
import initTranslations from "@/app/i18n";
import Link from "next/link";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import HighlightVerse from "@/components/bible/VerseHighlight";
import ChapterContent from "@/components/bible/ChapterContent";
import ChapterTitleAction from "@/components/bible/ChapterTitleAction";
import ScrollToVerse from "@/components/bible/ScrollToVerse";

const apiUrl = process.env.API_URL;

interface Props {
  params: Promise<{ book: string[]; locale: string }>;
}

const BookPage: FC<Props> = async ({ params }) => {
  const { book, locale } = await params;
  const { t } = await initTranslations(locale, ["common", "book"]);

  const [bookKey, chapterNum, bookLen] = book;

  let verses: Verse[] = [];
  try {
    const response = await fetch(
      `${apiUrl}/verses/${bookKey}/${chapterNum}/${locale}`,
    );

    console.log('Response:', response);

    if (!response.ok) throw new Error(ERROR_KEYS.FAILED_TO_FETCH);
    verses = await response.json();
  } catch (error) {
    console.error(error);
  }

  const formattedchapterNum = formatNumber(+chapterNum, locale as Lang);

  return (
    <div className={styles.pageContainer}>
      <ScrollToVerse />
      <div className={styles.chapterContainer}>
        <div className={styles.chapterNav}>
          {+chapterNum > 1 ? (
            <Link
              href={`/${bookKey}/${+chapterNum - 1}/${bookLen}`}
              className={styles.chapterLink}
            >
              <GrLinkPrevious className="flip-icon" />
              {t("prev")}
            </Link>
          ) : (
            <span
              className={`${styles.chapterLink} ${styles.disabled}`}
              aria-disabled="true"
            >
              <GrLinkPrevious className="flip-icon" />
              {t("prev")}
            </span>
          )}
          <ChapterTitleAction>
            <h3 className={styles.chapterTitle}>
              {t(bookKey, { ns: "book" })} {formattedchapterNum}
            </h3>
          </ChapterTitleAction>
          {+chapterNum < +bookLen ? (
            <Link
              href={`/${bookKey}/${+chapterNum + 1}/${bookLen}`}
              className={styles.chapterLink}
            >
              {t("next")}
              <GrLinkNext className="flip-icon" />
            </Link>
          ) : (
            <span
              className={`${styles.chapterLink} ${styles.disabled}`}
              aria-disabled="true"
            >
              {t("next")}
              <GrLinkNext className="flip-icon" />
            </span>
          )}
        </div>
        <ChapterContent
          bookKey={bookKey as BookKey}
          chapterNum={+chapterNum}
          verses={verses}
        >
          {verses.map((v: Verse) => {
            const formattedVerseNum = formatNumber(v.num, locale as Lang);
            return (
              <Fragment key={v.num}>
                {" "}
                <HighlightVerse verseId={v.id}>
                  <p id={`v-${v.id}`} className={styles.verse}>
                    <span className={styles.verseNumber}>
                      {formattedVerseNum}
                    </span>
                    {v.verseTranslations[0].textDiacritized}
                  </p>
                </HighlightVerse>
              </Fragment>
            );
          })}
        </ChapterContent>
      </div>
    </div>
  );
};

export default BookPage;
