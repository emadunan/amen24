import Link from "next/link";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import styles from "./NavBar.module.css";

interface Props {
  normalizedPath: string;
  isBookPath: boolean;
}

const NavBar: FC<Props> = ({ normalizedPath, isBookPath }) => {
  const { t } = useTranslation();
  return (
    <ul className={styles.navList}>
      <li
        className={`${styles.navItem} ${normalizedPath === "/" ? styles.active : ""}`}
      >
        <Link className="link" href="/">
          <h3>{t("main.home")}</h3>
        </Link>
      </li>
      <li
        className={`${styles.navItem} ${normalizedPath === "/bible" || isBookPath ? styles.active : ""}`}
      >
        <Link className="link" href="/bible">
          <h3>{t("main.bible")}</h3>
        </Link>
      </li>
      <li
        className={`${styles.navItem} ${normalizedPath === "/search" ? styles.active : ""}`}
      >
        <Link className="link" href="/search">
          <h3>{t("main.search")}</h3>
        </Link>
      </li>
      <li
        className={`${styles.navItem} ${normalizedPath === "/glossary" ? styles.active : ""}`}
      >
        <Link className="link" href="/glossary">
          <h3>{t("main.glossary")}</h3>
        </Link>
      </li>
      <li
        className={`${styles.navItem} ${normalizedPath === "/library" ? styles.active : ""}`}
      >
        <Link className="link" href="/library">
          <h3>{t("library.title")}</h3>
        </Link>
      </li>
      <li
        className={`${styles.navItem} ${normalizedPath === "/contact-us" ? styles.active : ""}`}
      >
        <Link className="link" href="/contact-us">
          <h3>{t("main.contactUsTitle")}</h3>
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
