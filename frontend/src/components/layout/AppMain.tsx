import React, { FC } from 'react';
import styles from "./AppMain.module.css";

interface Props {
  children: React.ReactNode;
}

const AppMain: FC<Props> = ({ children }) => {
  return (
    <div className={styles.appContainer}>
      <main className={styles.appMain}>
        {children}
      </main>
    </div>
  )
}

export default AppMain