import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./AppLogo.module.css";
import { useGetMeQuery } from "@/store/userApi";
import { ThemeMode } from "@amen24/shared";
import Link from "next/link";

const LOCAL_STORAGE_KEY = "theme";

const AppLogo = () => {
  const { data: user } = useGetMeQuery();
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    // Load initial theme from localStorage
    if (typeof window !== "undefined") {
      return localStorage.getItem(LOCAL_STORAGE_KEY) === "dark";
    }
    return false; // Default to light mode
  });

  // Sync state when user logs in or localStorage changes
  useEffect(() => {
    if (user) {
      // If user is logged in, use backend preference
      setIsDarkMode(user.profile.themeMode === ThemeMode.DARK);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Remove stored theme to avoid conflicts
    } else {
      // If user is not logged in, use localStorage preference
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      setIsDarkMode(savedTheme === ThemeMode.DARK);
    }
  }, [user]);

  // Effect to detect theme changes from ThemeSwitcher
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(
        document.documentElement.getAttribute("data-theme") === ThemeMode.DARK,
      );
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Link href="/" className={styles.logo}>
      <Image
        src={isDarkMode ? "/img/logo-dark.png" : "/img/logo-light.png"}
        alt="Amen24 Logo"
        width={104}
        height={104}
        priority
      />
    </Link>
  );
};

export default AppLogo;
