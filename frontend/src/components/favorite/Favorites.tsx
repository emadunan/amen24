"use client";

import {
  useGetUserFavoritesQuery,
  useRemoveFavoriteMutation,
} from "@/store/favoriteApi";
import React from "react";
import styles from "./Favorites.module.css";
import Link from "next/link";
import { BookMap, formatNumber, Lang } from "@amen24/shared";
import { useTranslation } from "react-i18next";
import { MdDeleteForever } from "react-icons/md";

const Favorites = () => {
  const { data: favorites } = useGetUserFavoritesQuery();
  const [removeFavorite] = useRemoveFavoriteMutation();
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{t("userMenu.favorite")}</h3>
        <p>{formatNumber(favorites?.length || 0, i18n.language as Lang)}</p>
      </div>
      {favorites?.map((favorite) => {
        const bookKey = favorite.verseGroup.startingVerse.chapter.book.bookKey;
        const chapterNum = favorite.verseGroup.startingVerse.chapter.num;
        const totalChapters =
          BookMap[favorite.verseGroup.startingVerse.chapter.book.bookKey].len;
        const verseIds: number[] = [];
        const lang: Lang = i18n.language as Lang;

        const formattedChapterNum = formatNumber(
          chapterNum,
          i18n.language as Lang,
        );
        const formattedFirstVerseNum = formatNumber(
          favorite.verseGroup.startingVerse.num,
          i18n.language as Lang,
        );
        const formattedLastVerseNum = formatNumber(
          favorite.verseGroup.verses.at(-1)?.num || 0,
          i18n.language as Lang,
        );

        return (
          <div
            key={favorite.id}
            className={styles.verseBlock}
            dir={lang === Lang.ENGLISH ? "ltr" : "rtl"}
          >
            <p className={styles.verseText}>
              {favorite.verseGroup.verses
                .map((verse) => verse.verseTranslations.at(0)?.textDiacritized)
                .join(" ")}
            </p>
            <div className={styles.verseActions}>
              <Link
                className={styles.reference}
                href={`/${bookKey}/${chapterNum}/${totalChapters}?v=${verseIds.toString().concat(",")}`}
              >
                &mdash;{" "}
                {BookMap[bookKey].title[lang as Lang.ARABIC | Lang.ENGLISH]}{" "}
                {formattedChapterNum} : {formattedFirstVerseNum}
                {favorite.verseGroup.verses.length > 1 &&
                  ` - ${formattedLastVerseNum}`}
              </Link>
              <button
                onClick={() => removeFavorite(favorite.id)}
                className={styles.removeButton}
              >
                <MdDeleteForever size="1.3rem" />
                {t("remove")}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Favorites;
