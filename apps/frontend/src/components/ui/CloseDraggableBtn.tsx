import React, { FC } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import styles from "./CloseDraggableBtn.module.css";

interface Props {
  onClose: () => void;
}

const CloseDraggableBtn: FC<Props> = ({ onClose }) => {
  return (
    <button className={styles.closeButton} onClick={onClose}>
      <FaRegWindowClose size="1.2rem" className={styles.closeIcon} />
    </button>
  );
};

export default CloseDraggableBtn;
