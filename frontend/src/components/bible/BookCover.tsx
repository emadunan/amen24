import React, { FC } from 'react';
import styles from "./BookCover.module.css";
import Image from 'next/image';

interface Props {
  id: number;
  bookKey: string;
}

const BookCover: FC<Props> = ({ id, bookKey }) => {
  return (
    <article className={styles.bookCover}>
      <h4 className={styles.bookTitle}>{id}-{bookKey}</h4>
      <div className={styles.imgOverlay} />
      <Image src={`/img/book-cover/${id}-${bookKey}.jpg`} alt={`${bookKey}`} layout='fill' objectFit='cover' priority />
    </article>
  )
}

export default BookCover;