import { BookKey, formatNumber, Lang, Verse } from "@amen24/shared";
import React, { FC, Fragment } from "react";
import styles from "./page.module.css";
import initTranslations from "@/app/i18n";
import Link from "next/link";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import HighlightVerse from "@/components/bible/VerseHighlight";
import ChapterContent from "@/components/bible/ChapterContent";
import ChapterTitleAction from "@/components/bible/ChapterTitleAction";

const apiUrl = process.env.API_URL;

interface Props {
  params: { book: string[]; locale: string };
}

const BookPage: FC<Props> = async ({ params }) => {
  const { book, locale } = await params;
  const { t } = await initTranslations(locale, ["common", "book"]);

  const [bookKey, chapterNo, bookLen] = book;

  const response = await fetch(
    `${apiUrl}/verses/${bookKey}/${chapterNo}/${locale}`,
  );

  if (!response.ok) throw new Error("failedToFetch");
  const verses: Verse[] = await response.json();

  const formattedChapterNo = formatNumber(+chapterNo, locale as Lang);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chapterContainer}>
        <div className={styles.chapterNav}>
          {+chapterNo > 1 ? (
            <Link
              href={`/${bookKey}/${+chapterNo - 1}/${bookLen}`}
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
              {t(bookKey, { ns: "book" })} {formattedChapterNo}
            </h3>
          </ChapterTitleAction>
          {+chapterNo < +bookLen ? (
            <Link
              href={`/${bookKey}/${+chapterNo + 1}/${bookLen}`}
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
          chapterNo={+chapterNo}
          verses={verses}
        >
          {verses.map((v: Verse) => {
            const formattedVerseNo = formatNumber(v.verseNo, locale as Lang);
            return (
              <Fragment key={v.verseNo}>
                {" "}
                <HighlightVerse
                  verseNo={v.verseNo}
                  chapterNo={+chapterNo}
                  bookKey={bookKey as BookKey}
                >
                  <p className={styles.verse}>
                    <span className={styles.verseNumber}>
                      {formattedVerseNo}
                    </span>
                    {v.textDiacritized}
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
