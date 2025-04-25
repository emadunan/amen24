import React, { FC } from "react";
import { TbSquareChevronUp, TbSquareChevronDown } from "react-icons/tb";
import styles from "./ToggleDraggableBtn.module.css";

interface Props {
  isExpanded: boolean;
  onToggle: () => void;
}

const ToggleDraggableBtn: FC<Props> = ({ onToggle, isExpanded }) => {
  return (
    <button className={styles.toggleButton} onClick={onToggle}>
      {isExpanded ? (
        <TbSquareChevronUp size="1rem" className={styles.toggleIcon} />
      ) : (
        <TbSquareChevronDown size="1rem" className={styles.toggleIcon} />
      )}
    </button>
  );
};

export default ToggleDraggableBtn;
