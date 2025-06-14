import React from "react";
import styles from "./Button.module.css";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "accent" | "danger";
};

const Button: React.FC<Props> = ({
  children,
  className,
  variant = "primary",
  ...props
}) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
