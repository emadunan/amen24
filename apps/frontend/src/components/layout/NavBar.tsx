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
      <li className={styles.navItem}>
        <Link
          className={`link ${normalizedPath === "/home" || isBookPath ? `${styles.active}` : ""}`}
          href={"/home"}
        >
          {" "}
          <h3>{t("main.home")}</h3>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          className={`link ${normalizedPath === "/" || isBookPath ? `${styles.active}` : ""}`}
          href={"/"}
        >
          {" "}
          <h3>{t("main.bible")}</h3>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          className={`link ${normalizedPath === "/search" ? `${styles.active}` : ""}`}
          href={"/search"}
        >
          <h3>{t("main.search")}</h3>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          className={`link ${normalizedPath === "/glossary" ? `${styles.active}` : ""}`}
          href={"/glossary"}
        >
          <h3>{t("main.glossary")}</h3>
        </Link>
      </li>
      <li className={styles.navItem}>
        <Link
          className={`link ${normalizedPath === "/contact-us" ? `${styles.active}` : ""}`}
          href={"/contact-us"}
        >
          <h3>{t("main.contactUsTitle")}</h3>
        </Link>
      </li>
    </ul>
  );
};

export default NavBar;
