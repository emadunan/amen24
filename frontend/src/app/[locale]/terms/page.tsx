"use client";

import { useTranslation } from "react-i18next";
import styles from "./page.module.css";

export default function TermsOfService() {
  const { t } = useTranslation("terms");

  return (
    <main className={styles.terms}>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.intro}>{t("intro")}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("agreement.title")}</h2>
        <p className={styles.text}>{t("agreement.description")}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("account.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("account.responsibility")}</li>
          <li className={styles.listItem}>{t("account.security")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("usage.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("usage.lawful")}</li>
          <li className={styles.listItem}>{t("usage.prohibitedActivities")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("contentRights.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("contentRights.ownership")}</li>
          <li className={styles.listItem}>{t("contentRights.license")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("termination.title")}</h2>
        <p className={styles.text}>{t("termination.description")}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("disclaimer.title")}</h2>
        <p className={styles.text}>{t("disclaimer.description")}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("liability.title")}</h2>
        <p className={styles.text}>{t("liability.description")}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("changes.title")}</h2>
        <p className={styles.text}>{t("changes.description")}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("contact.title")}</h2>
        <p className={styles.text}>
          Email:{" "}
          <a href="mailto:support@amen24.org" className={styles.link}>
            support@amen24.org
          </a>
        </p>
      </section>

      <p className={styles.lastUpdated}>{t("lastUpdated")}</p>
    </main>
  );
}
