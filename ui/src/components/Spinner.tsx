import React from "react";
import styles from "./Spinner.module.css";

interface SpinnerProps {
  size?: "1rem" | "2rem" | "3rem" | "4rem" | "5rem" | "6rem" | "7rem";
  borderColor?: "background" | "text" | "primary" | "secondary" | "accent";
  borderTopColor?: "background" | "text" | "primary" | "secondary" | "accent";
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "4rem",
  borderColor = "accent",
  borderTopColor = "secondary",
}) => {
  return (
    <div className={styles.spinnerContainer}>
      <div
        className={styles.spinner}
        style={{
          width: size,
          height: size,
          border: `4px solid var(--${borderColor})`,
          borderTop: `4px solid var(--${borderTopColor})`,
        }}
      ></div>
    </div>
  );
};
