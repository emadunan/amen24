import { Featured, FeaturedPosition } from '@amen24/shared';
import { ChangeEvent, FC } from 'react';
import styles from './FeaturedListItem.module.css';
import { NavLink } from 'react-router-dom';
import { getDirection } from '@amen24/ui';
import { useUpdateFeaturedMutation } from '../../store/featuredApi';

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

  const [updateFeatured] = useUpdateFeaturedMutation();

  function handleUpdatePosition(e: ChangeEvent<HTMLSelectElement>) {
    const selectedOption = e.target.value as FeaturedPosition;

    updateFeatured({ id: featuredItem.id, position: selectedOption });
  }

  // [[key, value],...]
  const positionOptions = Object.entries(FeaturedPosition);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>
          #{featuredItem.id} [VG-{featuredItem.verseGroup.id}] — {bookKey}{' '}
          {chapterNum}:{firstVerseNum}
          {firstVerseNum !== lastVerseNum ? `-${lastVerseNum}` : ''}
        </h4>
        <div className={styles.actions}>
          <select className={styles.positionSelect} onChange={handleUpdatePosition} value={featuredItem.position}>
            {positionOptions.map(po => <option key={po[0]} value={po[1]}>{po[0]}</option>)}
          </select>
          <NavLink
            className={styles.openButton}
            to={`${featuredItem.id}`}
          >
            Open
          </NavLink>
        </div>
      </div>
      <p
        className={styles.text}
        dir={getDirection(text.lang)}
        lang={text.lang}
      >
        {text.text}
      </p>
    </div>
  );
};

export default FeaturedListItem;
