import { BookKey, Verse } from "@amen24/shared";
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

  const [bookId, bookKey, bookLen, chapterNum] = book;

  const response = await fetch(
    `${apiUrl}/verses/${bookKey}/${chapterNum}/${locale}`,
  );

  if (!response.ok) throw new Error("failedToFetch");

  const verses: Verse[] = await response.json();

  const chapterNumber =
    locale === "ar" ? (+chapterNum).toLocaleString("ar-EG") : chapterNum;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chapterContainer}>
        <div className={styles.chapterNav}>
          {+chapterNum > 1 ? (
            <Link
              href={`/${bookId}/${bookKey}/${bookLen}/${+chapterNum - 1}`}
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
              {t(bookKey, { ns: "book" })} {chapterNumber}
            </h3>
          </ChapterTitleAction>
          {+chapterNum < +bookLen ? (
            <Link
              href={`/${bookId}/${bookKey}/${bookLen}/${+chapterNum + 1}`}
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
            const verseNumber =
              locale === "ar" ? v.num.toLocaleString("ar-EG") : v.num;
            return (
              <Fragment key={v.id}>
                {" "}
                <HighlightVerse verseNum={v.num}>
                  <p className={styles.verse}>
                    <span className={styles.verseNumber}>{verseNumber}</span>
                    {v.text}
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
