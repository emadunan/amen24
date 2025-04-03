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
  const { t } = useTranslation("common");
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
              className={`${styles.link} ${normalizedPath === "/" || isBookPath ? styles.active : ""}`}
              href="/"
              onClick={() => setMenuOpen(false)}
            >
              {t("bible")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/search" ? styles.active : ""}`}
              href="/search"
              onClick={() => setMenuOpen(false)}
            >
              {t("search")}
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`${styles.link} ${normalizedPath === "/contact-us" ? styles.active : ""}`}
              href="/contact-us"
              onClick={() => setMenuOpen(false)}
            >
              {t("contactUsTitle")}
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavMenu;
