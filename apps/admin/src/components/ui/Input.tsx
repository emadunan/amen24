import React from "react";
import styles from "./Input.module.css";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input: React.FC<Props> = ({ label, error, className, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <input
        className={clsx(styles.input, error && styles.error, className)}
        {...props}
      />
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default Input;