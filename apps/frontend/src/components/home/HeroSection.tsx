"use client"

import React from 'react';
import Link from 'next/link';
import styles from './HeroSection.module.css';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{t("homepage.bibleSectionHeading")}</h2>
        <div className={styles.description}>
          <p >
            {t("homepage.bibleSectionParagraph")}
          </p>
        </div>
        <Link href="/bible" className={styles.link}>
          {t("homepage.bibleSectionButton")}
        </Link>
      </div>
    </section>
  )
}

export default HeroSection