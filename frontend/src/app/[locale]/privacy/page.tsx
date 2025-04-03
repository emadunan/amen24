"use client";

import { useTranslation } from "react-i18next";
import styles from "./page.module.css";

export default function PrivacyPolicy() {
  const { t } = useTranslation("privacy");

  return (
    <main className={styles.privacy}>
      <h1 className={styles.title}>{t("title")}</h1>
      <p className={styles.intro}>{t("intro")}</p>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("information.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("information.name")}</li>
          <li className={styles.listItem}>{t("information.email")}</li>
          <li className={styles.listItem}>{t("information.preferences")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("collection.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("collection.registration")}</li>
          <li className={styles.listItem}>{t("collection.thirdPartyLogin")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("usage.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("usage.improveServices")}</li>
          <li className={styles.listItem}>{t("usage.sendEmails")}</li>
          <li className={styles.listItem}>{t("usage.personalization")}</li>
          <li className={styles.listItem}>{t("usage.ads")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("thirdParty.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("thirdParty.analytics")}</li>
          <li className={styles.listItem}>{t("thirdParty.ads")}</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("userRights.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("userRights.edit")}</li>
          <li className={styles.listItem}>{t("userRights.deleteAccount")}</li>
          <li className={styles.listItem}>{t("userRights.optOutEmails")}</li>
        </ul>
      </section>

      <section className={styles.section} id="data-deletion-instructions">
        <h2 className={styles.sectionTitle}>{t("dataDeletionInstructions.title")}</h2>
        <p className={styles.listItem}>{t("dataDeletionInstructions.description")}</p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("security.title")}</h2>
        <ul className={styles.list}>
          <li className={styles.listItem}>{t("security.encryption")}</li>
          <li className={styles.listItem}>{t("security.accessControls")}</li>
          <li className={styles.listItem}>{t("security.audits")}</li>
        </ul>
      </section>

      {/* <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{t("compliance.title")}</h2>
        <p className={styles.text}>{t("compliance.description")}</p>
      </section> */}

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
