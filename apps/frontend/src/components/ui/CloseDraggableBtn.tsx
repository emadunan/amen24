import React, { FC } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import styles from "./CloseDraggableBtn.module.css";

interface Props {
  onClose: () => void;
  absolute?: boolean;
}

const CloseDraggableBtn: FC<Props> = ({ onClose, absolute }) => {
  return (
    <button
      className={`${styles.closeButton} ${absolute ? styles.absolute : ""}`}
      onClick={onClose}
    >
      <FaRegWindowClose size="1rem" className={styles.closeIcon} />
    </button>
  );
};

export default CloseDraggableBtn;
