import React, { FC } from "react";
import { IoChevronUpOutline, IoChevronDownOutline } from "react-icons/io5";
import styles from "./ToggleDraggableBtn.module.css";

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
}

const ToggleDraggableBtn: FC<Props> = ({ onToggle, isExpanded }) => {
  return (
    <button className={styles.toggleButton} onClick={onToggle}>
      {isExpanded ? (
        <IoChevronUpOutline className={styles.toggleIcon} />
      ) : (
        <IoChevronDownOutline className={styles.toggleIcon} />
      )}
    </button>
  );
};

export default ToggleDraggableBtn;
