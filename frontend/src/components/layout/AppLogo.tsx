import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import styles from "./AppLogo.module.css";
import { useGetProfileByEmailQuery } from "@/store/profileSlice";

const AppLogo = () => {
  const { data: user, error, isLoading } = useGetProfileByEmailQuery('');
  const isDarkMode = useMemo(() => user?.profile?.darkMode ?? false, [user]);

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
