"use client";

import { useEffect, useMemo, useCallback } from "react";
import styles from "./ThemeSwitcher.module.css";
import { useGetProfileByEmailQuery, useToggleProfileThemeMutation } from "@/store/profileSlice";

const ThemeSwitcher = () => {
  const { data: user, error, isLoading } = useGetProfileByEmailQuery('');
  const [mutate, { isLoading: isMutating }] = useToggleProfileThemeMutation();

  // Memoize dark mode state to prevent unnecessary re-renders
  const isDarkMode = useMemo(() => user?.profile.darkMode ?? false, [user]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light"); // Persist theme
  }, [isDarkMode]);

  // Handle theme toggle with optimistic UI update
  const handleToggle = useCallback(() => {
    mutate();
  }, [mutate]);

  if (error) return <p>Error loading theme</p>;

  return (
    <label className={styles.toggleWrapper}>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={isDarkMode}
        onChange={handleToggle}
        disabled={isLoading || isMutating} // Prevent changes while loading
      />
      <span className={styles.toggleSlider}>
        <span className={styles.icon}>{isDarkMode ? "🌙" : "🌞"}</span>
      </span>
    </label>
  );
};

export default ThemeSwitcher;
