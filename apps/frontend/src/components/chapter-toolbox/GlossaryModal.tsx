"use client";

import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import styles from "./GlossaryModal.module.css";
import { useTranslation } from "react-i18next";
import GlossaryVerse from "./GlossaryVerse";
import { useParams } from "next/navigation";
import { useGetVerseByIdQuery } from "@/store/apis/verseApi";
import { BookKey, ERROR_KEYS, Lang, sanitizeWord } from "@amen24/shared";
import { ActiveLang, glossaryReducer, initialState } from "./glossaryReducer";
import { useAddGlossaryTermMutation } from "@/store/apis/glossaryApi";
import { CreateBibleGlossaryDto, useFeedback } from "@amen24/ui";

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
  const [handleAddTerm, _result] = useAddGlossaryTermMutation();
  const params = useParams<{ book: [BookKey] }>();
  const { t } = useTranslation();
  const [bookKey] = params.book;
  const { showError, showApiError, showMessage } = useFeedback(t);

  const [glossaryState, glossaryDispatch] = useReducer(
    glossaryReducer,
    initialState,
  );

  function handleAddWordToTerm(lang: ActiveLang, rawWord: string) {
    const word = sanitizeWord(rawWord);
    glossaryDispatch({ type: "add", lang, word });
  }

  function handleClearTerm(lang?: ActiveLang) {
    glossaryDispatch({ type: "clear", lang });
  }

  async function handleAddGlossaryTerm() {
    const translations: CreateBibleGlossaryDto["translations"] = {};

    for (const [lang, words] of Object.entries(glossaryState)) {
      if (words.length < 1) {
        showError(ERROR_KEYS.GLOSSARY_MISSING_TERM);
        return;
      }

      translations[lang] = {
        term: words.join(" "),
        definition: "",
      };
    }

    const payload = {
      slug: glossaryState.en.join("-").toLowerCase(),
      verseIds: [verseId],
      translations,
    };

    try {
      const result = await handleAddTerm(payload).unwrap();
      console.log(result);

      showMessage(result.message);
      handleClearTerm();
      onClose();
    } catch (error) {
      showApiError(error);
    }
  }

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
              selectedWords={glossaryState.na}
              onAddWordToTerm={handleAddWordToTerm}
              onClearTerm={handleClearTerm}
            />
          )}
          {verseArText && (
            <GlossaryVerse
              lang={Lang.ARABIC}
              bookKey={bookKey}
              text={verseArText}
              selectedWords={glossaryState.ar}
              onAddWordToTerm={handleAddWordToTerm}
              onClearTerm={handleClearTerm}
            />
          )}
          {verseEnText && (
            <GlossaryVerse
              lang={Lang.ENGLISH}
              bookKey={bookKey}
              text={verseEnText}
              selectedWords={glossaryState.en}
              onAddWordToTerm={handleAddWordToTerm}
              onClearTerm={handleClearTerm}
            />
          )}
        </div>
        <div className={styles.btnRow}>
          <button className={styles.btnSubmit} onClick={handleAddGlossaryTerm}>
            {t("main.add")}
          </button>
          <button
            className={styles.btnClear}
            onClick={handleClearTerm.bind(null, undefined)}
          >
            {t("main.clear")}
          </button>
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
