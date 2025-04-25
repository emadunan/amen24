"use client"

import { formatNumber, Lang, Verse } from '@amen24/shared';
import React, { FC, Fragment, useEffect, useState } from 'react';
import VerseHighlight from './VerseHighlight';
import styles from './ChapterContentClient.module.css'
import { RootState } from '@/store';
import { useSelector } from 'react-redux';

interface Props {
  bookKey: string;
  chapterNum: string;
}

const ChapterContentClient: FC<Props> = ({ bookKey, chapterNum }) => {
  const lang = useSelector((state: RootState) => state.translation.lang);
  const [verses, setVerses] = useState<Verse[]>([]);

  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVerses = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/verses/${bookKey}/${chapterNum}/${lang}`
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

  const isRtl = [Lang.ARABIC, Lang.NATIVE].includes(lang);

  if (!lang) return null; //

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} >
      {verses.map((v: Verse) => {
        return (
          <Fragment key={v.num}>
            {" "}
            <VerseHighlight verseId={v.id}>
              <p id={`v-${v.id}`} className={styles.verse}>
                <span className={styles.verseNumber}>
                  {formatNumber(v.num, lang)}
                </span>
                {v.verseTranslations[0].textDiacritized}
              </p>
            </VerseHighlight>
          </Fragment>
        );
      })}
    </div>
  );
}

export default ChapterContentClient