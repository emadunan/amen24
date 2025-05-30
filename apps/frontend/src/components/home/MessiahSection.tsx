"use client";

import Link from "next/link";
import styles from "./MessiahSection.module.css";
import { useTranslation } from "react-i18next";

const MessiahSection = () => {
  const { t } = useTranslation();

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{t("homepage.messiahSectionHeading")}</h2>
      <div className={styles.content}>
        <p className={styles.paragraph}>
          {t("homepage.messiahSectionParagraph1")}
        </p>
        <p className={styles.paragraph}>
        {t("homepage.messiahSectionParagraph2")}
        </p>
      </div>
      <Link href={"/LUK/1/24"} className={styles.link}>{t("homepage.messiahSectionButton")}</Link>
    </section>
  );
};

export default MessiahSection;
