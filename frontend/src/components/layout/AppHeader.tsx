"use client"

import React from 'react';
import styles from "./AppHeader.module.css";
import Link from 'next/link';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../ui/LanguageSelector';
import AppLogo from './AppLogo';
import LoginButton from '../ui/LoginButton';


const AppHeader = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.appHeader}>

      <AppLogo />

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}><Link href={"/"}> <h3>{t('bible', { ns: 'common' })}</h3></Link></li>
          <li className={styles.navItem}><Link href={"/search"}><h3>{t('search', { ns: 'common' })}</h3></Link></li>
        </ul>

        <div className={styles.navActions}>
          <LanguageChanger />
          <ThemeSwitcher />
          <LoginButton />
        </div>
      </nav>
    </header>
  )
}

export default AppHeader