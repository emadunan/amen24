"use client"

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./GlossaryModal.module.css";
import { useTranslation } from "react-i18next";

interface GlossaryModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({ onClose, isOpen }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{t("toolbox.addGlossaryTerm")}</h2>
        <div>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </div>
        <div className={styles.btnRow}>
          <button className={styles.btnSubmit}>{t("main.add")}</button>
          <button className={styles.btnClear}>{t("main.clear")}</button>
          <button className={styles.btnCancel} onClick={onClose}>{t("main.cancel")}</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default GlossaryModal;
