import React, { FC } from "react";
import styles from "./MenuButton.module.css";

interface Props {
  onClick: () => void;
  isOpen: boolean;
}

export const MenuButton: FC<Props> = ({ onClick, isOpen }) => {
  return (
    <button
      className={`${styles.burger} ${isOpen ? styles.active : ""}`}
      onClick={onClick}
      aria-label="Toggle Menu"
    >
      <span></span>
    </button>
  );
};
