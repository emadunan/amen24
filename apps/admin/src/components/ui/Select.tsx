import React from "react";
import styles from "./Select.module.css";
import clsx from "clsx";

type Option = {
  label: string;
  value: string;
};

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Option[];
};

const Select: React.FC<Props> = ({ label, error, options, className, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}
      <select
        className={clsx(styles.select, error && styles.error, className)}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default Select;
