"use client";

import Link from "next/link";
import styles from "./AppFooter.module.css";
import { useTranslation } from "react-i18next";

export default function AppFooter() {
  const { t, i18n } = useTranslation();
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright} dir={i18n.language === "ar" ? "rtl" : "ltr"}>
        &copy; {new Date().getFullYear()}&mdash;{t("footer.copyright")}
      </p>
      <nav className={styles.nav}>
        <Link href="/privacy" className={styles.link}>
          {t("footer.privacyPolicy")}
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/terms" className={styles.link}>
          {t("footer.termsOfService")}
        </Link>
      </nav>
    </footer>
  );
}
