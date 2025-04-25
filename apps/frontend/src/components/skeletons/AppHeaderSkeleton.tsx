"use client";

import React from "react";
import styles from "./AppHeaderSkeleton.module.css";

const AppHeaderSkeleton = () => {
  return (
    <header className={styles.appHeader}>
      <div className={styles.nav}>
        {/* Left side (start-aligned) */}
        <div className={`${styles.navSide} ${styles.leftSide}`}>
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
        </div>

        {/* Center logo */}
        <div className={styles.logo}>
          <div className={styles.skeletonLogo} />
        </div>

        {/* Right side (end-aligned) */}
        <div className={`${styles.navSide} ${styles.rightSide}`}>
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
          <div className={styles.skeletonTab} />
        </div>
      </div>
    </header>
  );
};

export default AppHeaderSkeleton;
