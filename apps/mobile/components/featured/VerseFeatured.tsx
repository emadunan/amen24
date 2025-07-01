import React, { FC } from "react";
import VerseBlock from "../verse/VerseBlock";
import { Lang, BookMap, Featured } from "@amen24/shared";
import { useRemoveFromFeaturedMutation } from "@/store/apis/featuredApi";

interface Props {
  featured: Featured;
  lang: Lang;
}

const VerseFeatured: FC<Props> = ({ featured, lang }) => {
  const [removeFeatured] = useRemoveFromFeaturedMutation();

  const verse = featured.verseGroup.startingVerse;
  const chapter = verse.chapter;
  const verses = featured.verseGroup.verses;
  const bookKey = chapter.book.bookKey;
  const chapterNum = chapter.num;
  const totalChapters = BookMap[bookKey].len;

  const handleRemoveFeatured = () => {
    removeFeatured(featured.id);
  };

  return (
    <VerseBlock
      bookKey={bookKey}
      chapterNum={chapterNum}
      totalChapters={totalChapters}
      verses={verses}
      lang={lang}
      verseNum={verse.num}
      onRemove={handleRemoveFeatured}
    />
  );
};

export default VerseFeatured;
