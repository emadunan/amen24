"use client";

import { useGetUserFavoritesQuery } from "@/store/favoriteApi";
import React from "react";
import styles from "./Favorites.module.css";
import { formatNumber, Lang } from "@amen24/shared";
import { useTranslation } from "react-i18next";
import VerseFavorite from "../bible/VerseFavorite";

const Favorites = () => {
  const { data: favorites } = useGetUserFavoritesQuery();
  const { t, i18n } = useTranslation();
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{t("userMenu.favorite")}</h3>
        <p>{formatNumber(favorites?.length || 0, i18n.language as Lang)}</p>
      </div>
      {favorites?.map((fav) => (
        <VerseFavorite
          key={fav.id}
          favorite={fav}
          lang={i18n.language as Lang}
        />
      ))}
    </div>
  );
};

export default Favorites;
