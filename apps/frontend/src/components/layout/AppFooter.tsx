"use client";

import Link from "next/link";
import { Lang } from "@amen24/shared";
import styles from "./AppFooter.module.css";
import { useTranslation } from "react-i18next";
import { getDirection } from "@amen24/ui/utils";

const AppFooter = () => {
  const { t, i18n } = useTranslation();
  return (
    <footer className={styles.footer}>
      <p className={styles.copyright} dir={getDirection(i18n.language as Lang)}>
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
};

export default AppFooter;
