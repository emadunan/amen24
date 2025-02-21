"use client";
import { useEffect, useState } from "react";
import styles from "./ThemeSwitcher.module.css";
const ThemeSwitcher = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className={styles.toggleWrapper}>
      <input
        type="checkbox"
        className={styles.toggleInput}
        checked={theme === "dark"}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <span className={styles.toggleSlider}>
        <span className={styles.icon}>{theme === "light" ? "🌞" : "🌙"}</span>
      </span>
    </label>
  );
}

export default ThemeSwitcher;
