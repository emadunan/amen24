import { Featured, Lang } from '@amen24/shared';
import { FC } from 'react';
import styles from './FeaturedListItem.module.css';
import { NavLink } from 'react-router-dom';

interface Props {
  featuredItem: Featured;
}

const FeaturedListItem: FC<Props> = ({ featuredItem }) => {
  const firstVerseNum = featuredItem.verseGroup.startingVerse.num;
  const lastVerseNum =
    featuredItem.verseGroup.verses.at(-1)?.num || firstVerseNum;

  const chapter = featuredItem.verseGroup.startingVerse.chapter;
  const bookKey = chapter.book.bookKey;
  const chapterNum = chapter.num;

  const text = featuredItem.featuredText[0];
  const isArabic = text.lang === Lang.ARABIC;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          #{featuredItem.id} [VG-{featuredItem.verseGroup.id}] — {bookKey}{' '}
          {chapterNum}:{firstVerseNum}
          {firstVerseNum !== lastVerseNum ? `-${lastVerseNum}` : ''}
        </h4>
        <NavLink
          className={styles.openButton}
          to={`${featuredItem.id}`}
        >
          Open
        </NavLink>
      </div>
      <p
        className={styles.text}
        dir={isArabic ? 'rtl' : 'ltr'}
        lang={text.lang}
      >
        {text.text}
      </p>
    </div>
  );
};

export default FeaturedListItem;
