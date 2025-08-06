"use client";

import Link from "next/link";
import { getDirection, Lang } from "@amen24/shared";
import styles from "./AppFooter.module.css";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const AppFooter = () => {
  const { t, i18n } = useTranslation();
  const dir = getDirection(i18n.language as Lang);

  const googlePlayBadge =
    dir === "rtl"
      ? "/img/google-play-ar.png"
      : "/img/google-play-en.png";

  return (
    <footer className={styles.footer}>
      <p className={styles.copyright} dir={dir}>
        &copy; {new Date().getFullYear()} — {t("footer.copyright")}
      </p>

      <nav className={styles.nav} dir={dir}>
        <Link href="/privacy" className={styles.link}>
          {t("footer.privacyPolicy")}
        </Link>
        <span className={styles.separator}>|</span>
        <Link href="/terms" className={styles.link}>
          {t("footer.termsOfService")}
        </Link>
      </nav>

      <div className={styles.storeBadgeWrapper} dir={dir}>
        <a
          href="https://play.google.com/store/apps/details?id=yeshua.emadunan.amen24"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={googlePlayBadge}
            alt={t("footer.downloadOnGooglePlay")}
            className={styles.storeBadge}
            width={180}
            height={60}
            priority={false}
          />
        </a>
      </div>
    </footer>
  );
};

export default AppFooter;
