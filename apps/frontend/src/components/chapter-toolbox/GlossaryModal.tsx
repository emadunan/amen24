"use client";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./GlossaryModal.module.css";
import { useTranslation } from "react-i18next";
import { useGetVerseByIdQuery } from "@/store/apis/verseApi";
import { BookKey, Lang } from "@amen24/shared";
import GlossaryVerse from "./GlossaryVerse";
import { useParams } from "next/navigation";

interface GlossaryModalProps {
  onClose: () => void;
  isOpen: boolean;
  verseId: number;
}

const GlossaryModal: React.FC<GlossaryModalProps> = ({
  onClose,
  isOpen,
  verseId,
}) => {
  const { t } = useTranslation();
  const params = useParams<{ book: [BookKey] }>();
  const [bookKey] = params.book;

  const { data: verseNA } = useGetVerseByIdQuery({
    verseId,
    lang: Lang.NATIVE,
  });
  const { data: verseAr } = useGetVerseByIdQuery({
    verseId,
    lang: Lang.ARABIC,
  });
  const { data: verseEn } = useGetVerseByIdQuery({
    verseId,
    lang: Lang.ENGLISH,
  });

  const verseNAText = verseNA?.verseTranslations?.[0]?.text;
  const verseArText = verseAr?.verseTranslations?.[0]?.text;
  const verseEnText = verseEn?.verseTranslations?.[0]?.text;

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
          {verseNAText && (
            <GlossaryVerse
              lang={Lang.NATIVE}
              bookKey={bookKey}
              text={verseNAText}
            />
          )}
          {verseArText && (
            <GlossaryVerse
              lang={Lang.ARABIC}
              bookKey={bookKey}
              text={verseArText}
            />
          )}
          {verseEnText && (
            <GlossaryVerse
              lang={Lang.ENGLISH}
              bookKey={bookKey}
              text={verseEnText}
            />
          )}
        </div>
        <div className={styles.btnRow}>
          <button className={styles.btnSubmit}>{t("main.add")}</button>
          <button className={styles.btnClear}>{t("main.clear")}</button>
          <button className={styles.btnCancel} onClick={onClose}>
            {t("main.cancel")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default GlossaryModal;
