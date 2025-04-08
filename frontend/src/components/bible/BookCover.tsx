import React, { FC } from "react";
import styles from "./BookCover.module.css";
import Image from "next/image";
import initTranslations from "@/app/i18n";
import Link from "next/link";

interface Props {
  bookId: number;
  bookKey: string;
  bookLen: number;
  locale: string;
}

const BookCover: FC<Props> = async ({ bookId, bookKey, bookLen, locale }) => {
  const { t } = await initTranslations(locale, ["book"]);

  return (
    <Link className={styles.bookLink} href={`/${bookKey}/1/${bookLen}`}>
      <article className={styles.bookCover}>
        <h2 className={styles.bookTitle}>{t(bookKey, { ns: "book" })}</h2>
        <div className={styles.imgOverlay} />
        <Image
          src={`/img/book-cover/${bookId}_${bookKey}.jpg`}
          alt={`${bookKey}`}
          fill
          style={{ objectFit: "cover" }}
          priority
          sizes="10rem"
        />
      </article>
    </Link>
  );
};

export default BookCover;
