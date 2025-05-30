import React from "react";
import styles from "./GlossaryContainer.module.css";

interface Props {
  children: React.ReactNode;
}

const GlossaryContainer: React.FC<Props> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default GlossaryContainer;
