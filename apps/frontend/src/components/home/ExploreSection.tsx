"use client";

import React from "react";
import styles from "./ExploreSection.module.css";
import { useTranslation } from "react-i18next";
import Link from "next/link";

const ExploreSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.exploreSection}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{t("homepage.searchSectionHeading")}</h2>
        <p className={styles.description}>
          {t("homepage.searchSectionParagraph")}
        </p>
        <Link href="/search" className={styles.link}>
          {t("homepage.searchSectionButton")}
        </Link>
      </div>
      {/* <div className={styles.content}>
        <h2 className={styles.heading}>
          {t("homepage.glossarySectionHeading")}
        </h2>
        <p className={styles.description}>
          {t("homepage.glossarySectionParagraph")}
        </p>
        <Link href="/glossary" className={styles.link}>
          {t("homepage.glossarySectionButton")}
        </Link>
      </div> */}
    </section>
  );
};

export default ExploreSection;
