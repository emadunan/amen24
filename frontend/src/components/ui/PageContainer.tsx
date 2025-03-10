import React, { FC, ReactNode } from "react";
import styles from "./PageContainer.module.css";

interface Props {
  children: ReactNode;
}

const PageContainer: FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default PageContainer;
