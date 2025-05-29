"use client";

import React from "react";
import VerseFeatured from "./VerseFeatured";
import styles from "./FeaturedList.module.css";
import { useTranslation } from "react-i18next";
import { formatNumber, Lang } from "@amen24/shared";
import { useGetAllFeaturedQuery } from "@/store/apis/featuredApi";

const FeaturedList = () => {
  const { t, i18n } = useTranslation();
  const { data: featured } = useGetAllFeaturedQuery({lang: i18n.language as Lang});

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h3>{t("userMenu.featured")}</h3>
        <p>{formatNumber(featured?.length || 0, i18n.language as Lang)}</p>
      </div>
      {featured?.map((feat) => (
        <VerseFeatured
          key={feat.id}
          featured={feat}
          lang={i18n.language as Lang}
        />
      ))}
    </div>
  );
};

export default FeaturedList;
