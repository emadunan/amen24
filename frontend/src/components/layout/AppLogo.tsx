import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./AppLogo.module.css";
import { useGetMeQuery } from "@/store/users";

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
      setIsDarkMode(user.darkMode);
      localStorage.removeItem(LOCAL_STORAGE_KEY); // Remove stored theme to avoid conflicts
    } else {
      // If user is not logged in, use localStorage preference
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      setIsDarkMode(savedTheme === "dark");
    }
  }, [user]);

  // Effect to detect theme changes from ThemeSwitcher
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.getAttribute("data-theme") === "dark");
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  return (
    <Image
      src={isDarkMode ? "/img/logo-dark.png" : "/img/logo-light.png"}
      className={styles.logo}
      alt="Amen24 Logo"
      width={104}
      height={104}
      priority
    />
  );
};

export default AppLogo;
