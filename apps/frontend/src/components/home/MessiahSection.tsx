"use client";

import Link from "next/link";
import styles from "./MessiahSection.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const MessiahSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>{t("homepage.messiahSectionHeading")}</h2>
        <p className={styles.paragraph}>
          {t("homepage.messiahSectionParagraph1")}
        </p>
        <p className={styles.paragraph}>
          {t("homepage.messiahSectionParagraph2")}
        </p>
        <Link href={"/MAT/1/28"} className={styles.link}>
          {t("homepage.messiahSectionButton")}
        </Link>
      </div>
      <div className={styles.imageContainer}>
        <div className={styles.imageWrapper}>
          <Image
            src="/img/jesus.jpg"
            alt="Open Bible"
            fill
            className={styles.image}
            priority
          />
        </div>
      </div>
    </section>
  );
};

export default MessiahSection;
