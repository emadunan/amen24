import { Verse } from '@amen24/shared';
import React, { FC } from 'react';

interface Props {
  params: { book: string[], locale: string };
}

const BookPage: FC<Props> = async ({ params }) => {
  const { book, locale } = await params;
  const [bookId, bookKey, bookLen, chapterNum] = book;

  const response = await fetch(`http://localhost:5000/verses/${bookKey}/${chapterNum}/${locale}`);

  if (!response.ok) throw new Error("Failed to fetch data!");

  const verses = await response.json();  

  return (
    <div>{verses.map((v: Verse ) => <p>{v.text}</p>)}</div>
  )
}

export default BookPage;