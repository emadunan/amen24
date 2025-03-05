import { Verse } from "@amen24/shared";
import React, { FC } from "react";
import styles from "./page.module.css";

interface Props {
  params: { book: string[]; locale: string };
}

const BookPage: FC<Props> = async ({ params }) => {
  const { book, locale } = await params;
  const [bookId, bookKey, bookLen, chapterNum] = book;

  const response = await fetch(
    `http://localhost:5000/verses/${bookKey}/${chapterNum}/${locale}`,
  );

  if (!response.ok) throw new Error("Failed to fetch data!");

  const verses = await response.json();

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chapterContainer}>
        <h4 className={styles.chapterTitle}>Chapter {chapterNum}</h4>
        <div className={styles.chapterContent}>
          {verses.map((v: Verse) => (
            <p className={styles.verse}>{v.text} </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookPage;
