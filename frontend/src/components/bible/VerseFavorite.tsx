import { BookMap, Favorite, Lang } from '@amen24/shared';
import React, { FC } from 'react';
import VerseBlock from './VerseBlock';
import { useRemoveFavoriteMutation } from '@/store/favoriteApi';

interface Props {
  favorite: Favorite
  lang: Lang;
}

const VerseFavorite: FC<Props> = ({ favorite, lang }) => {
  const [removeFavorite] = useRemoveFavoriteMutation();

  const verse = favorite.verseGroup.startingVerse;
  const chapter = verse.chapter;
  const verses = favorite.verseGroup.verses;
  const bookKey = chapter.book.bookKey;
  const chapterNum = chapter.num;
  const totalChapters = BookMap[bookKey].len;

  function handleRemoveFavorite() {
    removeFavorite(favorite.id);
  }


  return (
    <VerseBlock
      bookKey={bookKey}
      chapterNum={chapterNum}
      totalChapters={totalChapters}
      verses={verses}
      lang={lang}
      verseNum={verse.num}
      onRemove={handleRemoveFavorite}
    />
  )
}

export default VerseFavorite