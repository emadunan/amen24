"use client";

import Link from "next/link";
import styles from "./TestSiteWarningBanner.module.css";

const TestSiteWarningBanner = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.content}>
        <h1 className={styles.title}>⚠️ Warning: Test Environment</h1>
        <p className={styles.paragraph}>
          This is the **test version** of our website. **Do not enter any real data.**  
          Data may be deleted at any time. This environment is **not secure** and runs
          **without TLS encryption.**
        </p>
        <p>Only our internal team should use this for testing.</p>
        <Link href="https://amen24.org" className={styles.button}>
          Go to Live Website
        </Link>
      </div>
    </div>
  );
};

export default TestSiteWarningBanner;
