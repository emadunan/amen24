import React, { FC } from 'react';
import styles from "./BookCover.module.css";
import Image from 'next/image';
import initTranslations from '@/app/i18n';

interface Props {
  id: number;
  bookKey: string;
  locale: string;
}

const BookCover: FC<Props> = async ({ id, bookKey, locale }) => {
  const { t } = await initTranslations(locale, ['book']);

  return (
    <article className={styles.bookCover}>
      <h4 className={styles.bookTitle}>{t(bookKey, { ns: 'book' })}</h4>
      <div className={styles.imgOverlay} />
      <Image src={`/img/book-cover/${id}-${bookKey}.jpg`} alt={`${bookKey}`} fill
        style={{ objectFit: "cover" }} priority />
    </article>
  )
}

export default BookCover;