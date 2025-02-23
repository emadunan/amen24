import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./AppLogo.module.css";

const AppLogo = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);
  }, []);

  return (
    <Image
      src={theme === "dark" ? "/img/logo-dark.png" : "/img/logo-light.png"}
      className={styles.logo}
      alt="Amen24 Logo"
      width={104}
      height={104}
      priority
    />
  );
};

export default AppLogo;
