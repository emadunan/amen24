"use client"

import React from 'react';
import styles from "./AppHeader.module.css";
import Link from 'next/link';
import { IoMdLogIn } from "react-icons/io";
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../ui/LanguageChanger';
import Image from 'next/image';


const AppHeader = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.appHeader}>
      <Image src={`/logo.png`} alt='logo' width={104} height={104} className={styles.logo} />

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link href={"/"}> <h3>{t('bible', { ns: 'common' })}</h3></Link></li>
          <li className={styles.navItem}><Link href={"/search"}><h3>{t('search', { ns: 'common' })}</h3></Link></li>
        </ul>

        <div className={styles.navActions}>
          <LanguageChanger />
          <ThemeSwitcher />
        </div>
      </nav>
    </header>
  )
}

export default AppHeader