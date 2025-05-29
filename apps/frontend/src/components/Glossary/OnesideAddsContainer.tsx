import React from "react";
import styles from "./OnesideAddsContainer.module.css";

interface Props {
  children: React.ReactNode;
}

const OnesideAddsContainer: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default OnesideAddsContainer;
