"use client"

import {  Verse } from '@amen24/shared';
import { Spinner } from '@amen24/ui';
import React, { FC, Fragment, useEffect, useState } from 'react';
import VerseHighlight from './VerseHighlight';
import styles from './ChapterContentClient.module.css'

interface Props {
  bookKey: string;
  chapterNum: string;
}

const ChapterContentClient: FC<Props> = ({ bookKey, chapterNum }) => {
  const [verses, setVerses] = useState([]);

  useEffect(() => {
    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/verses/${bookKey}/${chapterNum}/na`,
    ).then(res => res.json()).then(data => setVerses(data));
  });

  if (!verses) {
    return <div className={styles.loadingContainer}>
      <Spinner />
    </div>
  }

  return (
    <div>
      {verses.map((v: Verse) => {
        return (
          <Fragment key={v.num}>
            {" "}
            <VerseHighlight verseId={v.id}>
              <p id={`v-${v.id}`} className={styles.verse}>
                <span className={styles.verseNumber}>
                  {v.num}
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