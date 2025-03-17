"use client";

import { useEffect, useState, useCallback } from "react";
import styles from "./ThemeSwitcher.module.css";
import { useGetMeQuery, useToggleThemeMutation } from "@/store/userApi";
import { ThemeMode } from "@amen24/shared";

const LOCAL_STORAGE_KEY = "theme";

const ThemeSwitcher = () => {
  // Fetch user data (contains darkMode preference)
  const { data: user, isLoading: isFetching } = useGetMeQuery();

  // Mutation to toggle theme
  const [toggleTheme, { isLoading: isMutating }] = useToggleThemeMutation();

  // Local state for non-logged-in users
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Effect: Initialize theme state
  useEffect(() => {
    let theme: boolean;

    if (user) {
      // If logged in, use backend preference and remove local storage
      theme = user.themeMode === ThemeMode.DARK;
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } else {
      // If not logged in, load from localStorage
      const savedTheme = localStorage.getItem(LOCAL_STORAGE_KEY);
      theme = savedTheme === "dark";
    }

    setIsDarkMode(theme);
    document.documentElement.setAttribute(
      "data-theme",
      theme ? "dark" : "light",
    );
  }, [user]);

  // Function to handle theme toggle
  const handleToggle = useCallback(async () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);

    // Update data-theme attribute on <html>
    document.documentElement.setAttribute(
      "data-theme",
      newTheme ? "dark" : "light",
    );

    if (user) {
      try {
        await toggleTheme(); // Toggle via backend
      } catch (error) {
        console.error("Failed to toggle theme:", error);
      }
    } else {
      // Save preference locally for non-logged-in users
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme ? "dark" : "light");
    }
  }, [isDarkMode, user, toggleTheme]);

  if (isDarkMode === null) return null; // Avoid rendering before theme is determined

  return (
    <label className={styles.toggleWrapper}>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={isDarkMode} // Set the checkbox state
        onChange={handleToggle} // Call the toggle function on change
        disabled={isFetching || isMutating} // Disable while fetching/mutating
      />
      <span className={styles.toggleSlider}>
        <span className={styles.icon}>{isDarkMode ? "🌙" : "🌞"}</span>
      </span>
    </label>
  );
};

export default ThemeSwitcher;
