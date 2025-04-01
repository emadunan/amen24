"use client";

import dynamic from "next/dynamic";
import React, { FC } from "react";
import styles from "./AppHeader.module.css";
import ThemeSwitcher from "../ui/ThemeSwitcher";
import LanguageChanger from "../ui/LanguageSelector";
import LoginButton from "../profile/LoginLink";
import { usePathname } from "next/navigation";
import i18nConfig from "@/config/next-i18n-router.config";
import { BookKey, User } from "@amen24/shared";
import UserMenu from "../profile/UserMenu";
import { useGetMeQuery } from "@/store/userApi";
import Spinner from "../ui/Spinner";
import Bookmark from "../ui/Bookmark";
import DateDisplay from "../ui/DateDisplay";
import NavBar from "./NavBar";
import NavMenu from "./NavMenu";
import useBreakpoint from "@/hooks/useBreakpoint";

const AppLogo = dynamic(() => import("./AppLogo"), {
  ssr: false,
  loading: () => (
    <div className={styles.logoLoading}>
      <Spinner size="6rem" />
    </div>
  ),
});

interface Props {
  user?: User;
}

const AppHeader: FC<Props> = () => {
  const pathname = usePathname();

  const { data: user, error } = useGetMeQuery(undefined, {
    skip: typeof window === "undefined",
  });

  const { isTablet, isLargePhone } = useBreakpoint();

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

  const isBookPath = Object.values(BookKey).some((path) =>
    pathname.includes(path),
  );

  return (
    <header className={styles.appHeader}>
      <AppLogo />

      <nav className={styles.nav}>
        <div className={styles.navLinks}>
          {isTablet ? (
            <NavMenu normalizedPath={normalizedPath} isBookPath={isBookPath} />
          ) : (
            <NavBar normalizedPath={normalizedPath} isBookPath={isBookPath} />
          )}
          {isLargePhone && <>
            <LanguageChanger />
            <ThemeSwitcher />
          </>}
        </div>

        <div className={styles.navActions}>
          {!isLargePhone && <>
            <LanguageChanger />
            <ThemeSwitcher />
          </>}

          {showLogin && <LoginButton />}
          {showUserMenu && <UserMenu user={user} />}
        </div>
        <DateDisplay />
        <Bookmark />
      </nav>
    </header>
  );
};

export default AppHeader;
