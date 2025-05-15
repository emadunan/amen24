import {
  BookKey,
  BookMap,
  ERROR_KEYS,
  formatNumber,
  Lang,
  Verse,
} from "@amen24/shared";
import React, { FC, Fragment } from "react";
import styles from "./page.module.css";
import initTranslations from "@/app/i18n";
import Link from "next/link";
import { GrLinkNext, GrLinkPrevious } from "react-icons/gr";
import VerseHighlight from "@/components/bible/VerseHighlight";
import ChapterContent from "@/components/bible/ChapterContent";
import ChapterTitleAction from "@/components/bible/ChapterTitleAction";
import ScrollToVerse from "@/components/bible/ScrollToVerse";
import ChapterContentClient from "@/components/bible/ChapterContentClient";
import TranslationSelector from "@/components/bible/TranslationSelector";
import ChapterContainer from "@/components/bible/ChapterContainer";
import { apiPrivateUrl } from "@/constants";
import { cookies } from "next/headers";
import { Metadata } from "next";
import AudioPlayerToggleBtn from "@/components/ui/AudioPlayerToggleBtn";

interface Props {
  params: Promise<{ book: string[]; locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const book = (await params).book;
  let lang = (await params).locale as Lang;

  if (lang !== Lang.ENGLISH && lang !== Lang.ARABIC) {
    lang = Lang.ENGLISH;
  }

  const bookKey = book[0];
  const chapterNum = book[1];
  const bookObj = BookMap[bookKey as BookKey];

  const title = `${bookObj.title[lang]} [${chapterNum}]`;
  const description = `${bookObj.description[lang]}`;

  const url = `https://amen24.org/${lang}/${bookKey}/${chapterNum}`;
  const imageUrl = `https://amen24.org/img/og-default.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Amen24",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
};

const BookPage: FC<Props> = async ({ params }) => {
  const { book, locale } = await params;
  const { t } = await initTranslations(locale, ["common", "book"]);

  const [bookKey, chapterNum, bookLen] = book;

  let verses: Verse[] = [];
  try {
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.toString();

    const response = await fetch(
      `${apiPrivateUrl}/verses/${bookKey}/${chapterNum}/${locale}`,
      {
        credentials: "include",
        headers: {
          Cookie: cookieHeader,
        },
      },
    );

    if (!response.ok) throw new Error(ERROR_KEYS.FAILED_TO_FETCH);
    verses = await response.json();
  } catch (error) {
    console.error(error);
  }

  const formattedchapterNum = formatNumber(+chapterNum, locale as Lang);

  return (
    <div className={styles.pageContainer}>
      <ChapterContainer>
        <ScrollToVerse />
        <div className={styles.chapterContainer}>
          <div className={styles.chapterNav}>
            {+chapterNum > 1 ? (
              <Link
                href={`/${bookKey}/${+chapterNum - 1}/${bookLen}`}
                className={styles.chapterLink}
              >
                <GrLinkPrevious className="flip-icon" />
                {t("main.prev")}
              </Link>
            ) : (
              <span
                className={`${styles.chapterLink} ${styles.disabled}`}
                aria-disabled="true"
              >
                <GrLinkPrevious className="flip-icon" />
                {t("main.prev")}
              </span>
            )}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ChapterTitleAction>
                <h3 className={styles.chapterTitle}>
                  {t(bookKey, { ns: "book" })} {formattedchapterNum}
                </h3>
              </ChapterTitleAction>
              <AudioPlayerToggleBtn bookKey={bookKey as BookKey} />
              <TranslationSelector />
            </div>
            {+chapterNum < +bookLen ? (
              <Link
                href={`/${bookKey}/${+chapterNum + 1}/${bookLen}`}
                className={styles.chapterLink}
              >
                {t("main.next")}
                <GrLinkNext className="flip-icon" />
              </Link>
            ) : (
              <span
                className={`${styles.chapterLink} ${styles.disabled}`}
                aria-disabled="true"
              >
                {t("main.next")}
                <GrLinkNext className="flip-icon" />
              </span>
            )}
          </div>
          <ChapterContent
            bookKey={bookKey as BookKey}
            chapterNum={+chapterNum}
            verses={verses}
          >
            <div style={{ display: "flex", gap: "2rem" }}>
              <div>
                {verses.map((v: Verse) => {
                  const formattedVerseNum = formatNumber(v.num, locale as Lang);
                  return (
                    <Fragment key={v.num}>
                      {" "}
                      <VerseHighlight verseId={v.id}>
                        <p id={`v-${v.id}`} className={styles.verse}>
                          <span className={styles.verseNumber}>
                            {formattedVerseNum}
                          </span>
                          {v.verseTranslations[0].textDiacritized}
                        </p>
                      </VerseHighlight>
                    </Fragment>
                  );
                })}
              </div>
              <ChapterContentClient bookKey={bookKey} chapterNum={chapterNum} />
            </div>
          </ChapterContent>
        </div>
      </ChapterContainer>
    </div>
  );
};

export default BookPage;
