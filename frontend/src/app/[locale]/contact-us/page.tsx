"use client";

import React from "react";
import styles from "./page.module.css";
import { RiMailUnreadLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const ContactUsPage = () => {
  const { t } = useTranslation();
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("contactUsTitle")}</h2>
      <p className={styles.description}>{t("contactUsDescription")}</p>

      <div className={styles.contactBox}>
        <RiMailUnreadLine className={styles.icon} />
        <a href="mailto:support@amen24.org" className={styles.email}>
          support@amen24.org
        </a>
      </div>
    </div>
  );
};

export default ContactUsPage;
