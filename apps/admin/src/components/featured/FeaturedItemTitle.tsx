import { Featured } from '@amen24/shared';
import { FC } from 'react';
import styles from "./FeaturedItemTitle.module.css";

interface Props {
  featuredItem: Featured;
}

const FeaturedItemTitle: FC<Props> = ({ featuredItem }) => {
  const firstVerseNum = featuredItem.verseGroup.startingVerse.num;
  const lastVerseNum =
    featuredItem.verseGroup.verses.at(-1)?.num || firstVerseNum;

  const chapter = featuredItem.verseGroup.startingVerse.chapter;
  const bookKey = chapter.book.bookKey;
  const chapterNum = chapter.num;

  return (
    <h4 className={styles.title}>
      #{featuredItem.id} [VG-{featuredItem.verseGroup.id}] — {bookKey}{' '}
      {chapterNum}:{firstVerseNum}
      {firstVerseNum !== lastVerseNum ? `-${lastVerseNum}` : ''}
    </h4>
  )
}

export default FeaturedItemTitle