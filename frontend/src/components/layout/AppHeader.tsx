import React from 'react';
import styles from "./AppHeader.module.css";
import Link from 'next/link';
import { IoMdLogIn } from "react-icons/io";
import ThemeSwitcher from '../ui/ThemeSwitcher';


const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.container}>
        <h1 className={styles.appLogo}>Amen24</h1>
        <nav>
          <ul className={styles.navList}>
            <li className={styles.navItem}><Link href={"/"}> <h3>Bible</h3></Link></li>
            <li className={styles.navItem}><Link href={"/search"}><h3>Search</h3></Link></li>
          </ul>
        </nav>
        <ThemeSwitcher />
        <button className={styles.loginBtn}><IoMdLogIn size={38} /></button>
      </div>
    </header>
  )
}

export default AppHeader