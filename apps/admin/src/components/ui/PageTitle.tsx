import React, { ReactNode } from "react";
import styles from "./PageTitle.module.css";

interface Props {
  children: ReactNode;
  className?: string;
}

const PageTitle: React.FC<Props> = ({ children, className }) => {
  const combinedClassName = [styles.title, className].filter(Boolean).join(" ");

  return <h2 className={combinedClassName}>{children}</h2>;
};

export default PageTitle;
