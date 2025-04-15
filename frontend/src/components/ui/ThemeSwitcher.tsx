"use client";

import { useState, useCallback, useLayoutEffect } from "react";
import styles from "./ThemeSwitcher.module.css";
import { useGetMeQuery, useUpdateProfileMutation } from "@/store/userApi";
import { ThemeMode } from "@amen24/shared";
import useBreakpoint from "@/hooks/useBreakpoint";

const LOCAL_STORAGE_KEY = "theme";

const ThemeSwitcher = () => {
  // Fetch user data (contains darkMode preference)
  const { data: user, isLoading: isFetching } = useGetMeQuery();

  // Mutation to toggle theme
  // const [toggleTheme, { isLoading: isMutating }] = useToggleThemeMutation();
  const [updateProfile, { isLoading: isMutating }] = useUpdateProfileMutation();

  // Local state for non-logged-in users
  const { isTablet } = useBreakpoint();
  const [isDarkMode, setIsDarkMode] = useState<boolean | null>(null);

  // Effect: Initialize theme state
  useLayoutEffect(() => {
    let theme: boolean;

    if (user) {
      // If logged in, use backend preference and remove local storage
      theme = user.profile.themeMode === ThemeMode.DARK;
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
        await updateProfile({ themeMode: newTheme ? ThemeMode.DARK : ThemeMode.LIGHT }); // Toggle via backend
      } catch (error) {
        console.error("Failed to toggle theme:", error);
      }
    } else {
      // Save preference locally for non-logged-in users
      localStorage.setItem(LOCAL_STORAGE_KEY, newTheme ? "dark" : "light");
    }
  }, [isDarkMode, user, updateProfile]);

  if (isDarkMode === null) return null; // Avoid rendering before theme is determined

  if (isTablet)
    return (
      <button className={styles.toggleButton} onClick={handleToggle}>
        <span>{isDarkMode ? "🌙" : "🌞"}</span>
      </button>
    );

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
