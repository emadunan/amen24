"use client";

import Link from "next/link";
import styles from "./BibleSection.module.css";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const BibleSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.bibleSection}>
      <div className={styles.content}>
        <h2 className={styles.heading}>{t("homepage.bibleSectionHeading")}</h2>
        <p className={styles.description}>
          {t("homepage.bibleSectionParagraph")}
        </p>
        <Link href="/bible" className={styles.link}>
          {t("homepage.bibleSectionButton")}
        </Link>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          src="/img/bible.jpg"
          alt="Open Bible"
          fill
          className={styles.image}
          priority
        />
      </div>
    </section>
  );
};

export default BibleSection;
