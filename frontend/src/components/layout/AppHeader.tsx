import Image from 'next/image';
import React from 'react';
import styles from "./AppHeader.module.css";

const AppHeader = () => {
  return (
    <header className={styles.appHeader}>
      <Image src="/amen-24.png" alt='Amen24 logo' width={124} height={124}/>
    </header>
  )
}

export default AppHeader