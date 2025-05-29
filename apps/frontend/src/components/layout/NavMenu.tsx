"use client";

import React, { FC, useState } from "react";
import MenuButton from "./MenuButton";
import styles from "./NavMenu.module.css";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface Props {
  normalizedPath: string;
  isBookPath: boolean;
}

const NavMenu: FC<Props> = ({ normalizedPath, isBookPath }) => {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={styles.navMenu}>
      {/* Menu Button */}
      <MenuButton
        isOpen={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      />

      {/* Overlay when menu is open */}
      {menuOpen && (
        <div className={styles.overlay} onClick={() => setMenuOpen(false)} />
      )}

      {/* Slide-in Menu */}
      <nav className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/home" ? styles.active : ""}`}
              href="/home"
              onClick={() => setMenuOpen(false)}
            >
              {t("main.home")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/bible" || isBookPath ? styles.active : ""}`}
              href="/bible"
              onClick={() => setMenuOpen(false)}
            >
              {t("main.bible")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/search" ? styles.active : ""}`}
              href="/search"
              onClick={() => setMenuOpen(false)}
            >
              {t("main.search")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/glossary" ? styles.active : ""}`}
              href="/glossary"
              onClick={() => setMenuOpen(false)}
            >
              {t("main.glossary")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/contact-us" ? styles.active : ""}`}
              href="/contact-us"
              onClick={() => setMenuOpen(false)}
            >
              {t("main.contactUsTitle")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
