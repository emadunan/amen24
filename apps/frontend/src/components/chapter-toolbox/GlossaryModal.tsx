"use client";

import React, { useEffect, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./GlossaryModal.module.css";
import { useTranslation } from "react-i18next";
import GlossaryVerse from "./GlossaryVerse";
import { useParams } from "next/navigation";
import { useGetVerseByIdQuery } from "@/store/apis/verseApi";
import { BibleGlossary, BookKey, ERROR_KEYS, Lang, sanitizeWord } from "@amen24/shared";
import { ActiveLang, glossaryReducer, initialState } from "./glossaryReducer";
import { useAddTermMutation, useLazyGetOneTermQuery, useLazyIsSlugExistQuery } from "@/store/apis/glossaryApi";
import { FaRegEdit } from "react-icons/fa";
import { useFeedback } from "@amen24/ui";
import Verified from "./Verified";

interface GlossaryModalProps {
  onClose: () => void;
  isOpen: boolean;
  verseId: number;
}

type TranslationsPayload = {
  [lang: string]: { term: string; definition: string };
};

const GlossaryModal: React.FC<GlossaryModalProps> = ({
  onClose,
  isOpen,
  verseId,
}) => {
  const [isSlugEdit, setIsSlugEdit] = useState<boolean>(false);
  const [customSlug, setCustomSlug] = useState<string>("");

  const [handleAddTerm] = useAddTermMutation();
  const params = useParams<{ book: [BookKey] }>();
  const bookKey = params.book?.[0];
  const { t } = useTranslation();
  const { showError, showApiError, showMessage } = useFeedback(t);

  const [glossaryState, glossaryDispatch] = useReducer(
    glossaryReducer,
    initialState,
  );

  function handleAddWordToTerm(lang: ActiveLang, rawWord: string) {
    let word = rawWord;
    if (lang !== Lang.NATIVE) word = sanitizeWord(rawWord);

    if (!word) return;
    glossaryDispatch({ type: "add", lang, word });
  }

  function handleClearTerm(lang: ActiveLang | undefined = undefined) {
    setVerifiedTerm(null);
    setIsSlugEdit(false);
    glossaryDispatch({ type: "clear", lang });
  }

  function handleCloseModal() {
    handleClearTerm();
    onClose();
  }

  async function handleAddGlossaryTerm() {
    const translations: TranslationsPayload = {};

    for (const [lang, words] of Object.entries(glossaryState).filter(
      ([lang]) => lang !== "na",
    )) {
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
      slug: finalSlug,
      native: glossaryState.na.join(" "),
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

  const verseNAText = verseNA?.verseTranslations?.[0]?.textDiacritized;
  const verseArText = verseAr?.verseTranslations?.[0]?.text;
  const verseEnText = verseEn?.verseTranslations?.[0]?.text;

  const autoSlug = glossaryState.en.join("-").toLowerCase();
  const finalSlug = customSlug.trim() !== "" ? customSlug.trim() : autoSlug;

  const [triggerSlugCheck, { data: isFound, isLoading }] = useLazyIsSlugExistQuery();

  const [verifiedTerm, setVerifiedTerm] = useState<BibleGlossary | null>(null);
  const [getVerifiedTermBySlug] = useLazyGetOneTermQuery();

  useEffect(() => {
    if (finalSlug) {
      triggerSlugCheck(finalSlug);
    }
  }, [finalSlug, triggerSlugCheck]);

  useEffect(() => {
    if (finalSlug && isFound) {
      getVerifiedTermBySlug(finalSlug)
        .unwrap()
        .then(setVerifiedTerm)
        .catch(() => setVerifiedTerm(null));
    }
  }, [finalSlug, isFound, getVerifiedTermBySlug]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const autoSlug = glossaryState.en.join("-").toLowerCase();
      setCustomSlug(autoSlug);
    }
  }, [isOpen, glossaryState.en]);

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>{t("toolbox.addGlossaryTerm")}</h2>
        <div>
          <div className={styles.slug} dir="ltr">
            <button
              className={styles.btnSlugEdit}
              onClick={() => setIsSlugEdit((prev) => !prev)}
              title={isSlugEdit ? "Cancel edit" : "Edit slug manually"}
            >
              <FaRegEdit />
            </button>

            <p>Slug:</p>

            {isSlugEdit ? (
              <input
                className={styles.slugInput}
                type="text"
                value={customSlug}
                onChange={(e) => setCustomSlug(e.target.value)}
                style={{ direction: "ltr" }}
              />
            ) : (
              <p>{customSlug}</p>
            )}
            <Verified isLoading={isLoading} isFound={isFound} term={finalSlug} />
          </div>
          {verifiedTerm && <p>{verifiedTerm.verses[0].verseTranslations.find(t => t.lang === Lang.ARABIC)!.textDiacritized}</p>}

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
          <button className={styles.btnClear} onClick={() => handleClearTerm()}>
            {t("main.clear")}
          </button>
          <button className={styles.btnCancel} onClick={handleCloseModal}>
            {t("main.cancel")}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default GlossaryModal;
