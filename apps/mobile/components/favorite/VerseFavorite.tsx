import React, { FC } from "react";
import { Favorite, Lang, BookMap } from "@amen24/shared";
import { useRemoveFavoriteMutation } from "@/store/apis/favoriteApi";
import VerseBlock from "../verse/VerseBlock";

interface Props {
  favorite: Favorite;
  lang: Lang;
}

const VerseFavorite: FC<Props> = ({ favorite, lang }) => {
  const [removeFavorite] = useRemoveFavoriteMutation();

  const verse = favorite.verseGroup.startingVerse;
  const chapter = verse.chapter;
  const verses = favorite.verseGroup.verses;
  const bookKey = chapter.book.bookKey;
  const bookId = chapter.book.id;
  const chapterNum = chapter.num;
  const totalChapters = BookMap[bookKey].len;

  const handleRemoveFavorite = () => {
    removeFavorite(favorite.id);
  };

  return (
    <VerseBlock
      bookId={bookId}
      bookKey={bookKey}
      chapterNum={chapterNum}
      totalChapters={totalChapters}
      verses={verses}
      lang={lang}
      verseNum={verse.num}
      onRemove={handleRemoveFavorite}
    />
  );
};

export default VerseFavorite;
