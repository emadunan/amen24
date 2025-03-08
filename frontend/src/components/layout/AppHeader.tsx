"use client";

import dynamic from "next/dynamic";

const AppLogo = dynamic(() => import("./AppLogo"), { ssr: false });

import React, { FC } from "react";
import styles from "./AppHeader.module.css";
import Link from "next/link";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import { useTranslation } from "react-i18next";
import LanguageChanger from "../ui/LanguageSelector";
import LoginButton from "../ui/LoginButton";
import { usePathname } from "next/navigation";
import i18nConfig from "@/config/next-i18n-router.config";
import { BibleBook, UserProfile } from "@amen24/shared";
import UserMenu from "../auth/UserMenu";
import { useGetMeQuery } from "@/store/users";

interface Props {
  user?: UserProfile;
}

const AppHeader: FC<Props> = () => {
  const pathname = usePathname();
  const { t } = useTranslation();

  const { data: user, isLoading, error } = useGetMeQuery();

  // Extract locale from the pathname
  const localePrefixes = i18nConfig.locales.map((locale) => `/${locale}`);
  let normalizedPath = pathname;

  // Remove locale prefix if it exists
  localePrefixes.forEach((prefix) => {
    if (pathname.startsWith(prefix + "/")) {
      normalizedPath = pathname.replace(prefix, ""); // Remove prefix
    } else if (pathname === prefix) {
      normalizedPath = "/"; // Convert "/ar" to "/"
    }
  });

  const showLogin =
    normalizedPath !== "/login" &&
    normalizedPath !== "/signup" &&
    (!user || error);
  const showUserMenu = user && !error;

  const isBookPath = Object.values(BibleBook).some((path) =>
    pathname.includes(path),
  );

  return (
    <header className={styles.appHeader}>
      <AppLogo />

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link
              className={`link ${normalizedPath === "/" || isBookPath ? `${styles.active}` : ""}`}
              href={"/"}
            >
              {" "}
              <h3>{t("bible", { ns: "common" })}</h3>
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link
              className={`link ${normalizedPath === "/search" ? `${styles.active}` : ""}`}
              href={"/search"}
            >
              <h3>{t("search", { ns: "common" })}</h3>
            </Link>
          </li>
        </ul>

        <div className={styles.navActions}>
          <LanguageChanger />
          <ThemeSwitcher />
          {showLogin && <LoginButton />}
          {showUserMenu && <UserMenu user={user} />}
        </div>
      </nav>
    </header>
  );
};

export default AppHeader;
