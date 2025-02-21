"use client"

import React from 'react';
import styles from "./AppHeader.module.css";
import Link from 'next/link';
import { IoMdLogIn } from "react-icons/io";
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { useTranslation } from 'react-i18next';
import LanguageChanger from '../ui/LanguageChanger';


const AppHeader = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.appHeader}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <div className={styles.navGroup}>
            <h1 className={styles.appLogo}>Amen24</h1>
            <ul className={styles.navList}>
              <li className={styles.navItem}><Link href={"/"}> <h3>{t('bible', { ns: 'common' })}</h3></Link></li>
              <li className={styles.navItem}><Link href={"/search"}><h3>{t('search', { ns: 'common' })}</h3></Link></li>
            </ul>
          </div>
          <div className={styles.actions}>
            <LanguageChanger />
            {/* <button className={styles.loginBtn}><IoMdLogIn size={38} /></button> */}
            <ThemeSwitcher />
          </div>
        </nav>
      </div>
    </header>
  )
}

export default AppHeader