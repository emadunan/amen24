"use client";

import { formatNumber, Lang, Verse } from "@amen24/shared";
import React, { FC, Fragment, useEffect, useState } from "react";
import VerseHighlight from "./VerseHighlight";
import styles from "./ChapterContentClient.module.css";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface Props {
  bookKey: string;
  chapterNum: string;
}

const isOldTestament = (bookKey: string): boolean => {
  const oldTestamentBooks = [
    "GEN",
    "EXO",
    "LEV",
    "NUM",
    "DEU",
    "JOS",
    "JDG",
    "RUT",
    "1SA",
    "2SA",
    "1KI",
    "2KI",
    "1CH",
    "2CH",
    "EZR",
    "NEH",
    "EST",
    "JOB",
    "PSA",
    "PRO",
    "ECC",
    "SNG",
    "ISA",
    "JER",
    "LAM",
    "EZK",
    "DAN",
    "HOS",
    "JOL",
    "AMO",
    "OBA",
    "JON",
    "MIC",
    "NAM",
    "HAB",
    "ZEP",
    "HAG",
    "ZEC",
    "MAL",
  ];
  return oldTestamentBooks.includes(bookKey);
};

const ChapterContentClient: FC<Props> = ({ bookKey, chapterNum }) => {
  const lang = useSelector((state: RootState) => state.translation.lang);
  const [verses, setVerses] = useState<Verse[]>([]);

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verses/${bookKey}/${chapterNum}/${lang}`,
        );

        const data: Verse[] = await response.json();

        if (Array.isArray(data)) {
          setVerses(data);
        } else {
          setVerses([]);
        }
      } catch (err) {
        console.error("Error fetching verses", err);
        setVerses([]);
      } finally {
        // setLoading(false);
      }
    };

    //setLoading(true);
    fetchVerses();
  }, [bookKey, chapterNum, lang]);

  // if (loading) {
  //   return <div className={styles.loadingContainer}>
  //     <Spinner />
  //   </div>
  // }

  const renderLang: Lang =
    lang === Lang.NATIVE
      ? isOldTestament(bookKey)
        ? Lang.HEBREW
        : Lang.GREEK
      : lang;

  const isRtl = renderLang === Lang.HEBREW || renderLang === Lang.ARABIC;

  if (!lang) return null;

  return (
    <div dir={isRtl ? "rtl" : "ltr"}>
      {verses.map((v: Verse) => {
        return (
          <Fragment key={v.num}>
            {" "}
            <VerseHighlight verseId={v.id}>
              <p
                id={`v-${v.id}`}
                className={`${styles.verse} ${renderLang === Lang.HEBREW ? styles.hebrew : ""}`}
              >
                <span className={styles.verseNumber}>
                  {formatNumber(v.num, renderLang)}
                </span>
                {v.verseTranslations[0].textDiacritized}
              </p>
            </VerseHighlight>
          </Fragment>
        );
      })}
    </div>
  );
};

export default ChapterContentClient;
