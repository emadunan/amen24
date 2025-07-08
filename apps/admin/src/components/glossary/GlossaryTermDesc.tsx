import React, { useState } from "react";
import { Spinner } from "@amen24/ui";
import { useTranslation } from "react-i18next";
import styles from "./GlossaryTermDesc.module.css";
import { useLazyTranslateTextQuery } from "../../store/libreTranslateApi";
import {
  ApprovalStatus,
  BibleGlossaryTranslation,
  flagMap,
  Lang,
  getDirection
} from "@amen24/shared";
import {
  useGenerateAiDefinitionMutation,
  useUpdateTermMutation,
  useUpdateTranslationMutation,
} from "../../store/glossaryApi";
import ReactMarkdown from "react-markdown";

interface Props {
  slug: string;
  native: string;
  verseRef: string;
  arabicText: string;
  bgt: BibleGlossaryTranslation;
}

const GlossaryTermDesc: React.FC<Props> = ({
  slug,
  native,
  verseRef,
  arabicText,
  bgt,
}) => {
  const { t } = useTranslation();
  const [updateTranslation, _translationResult] =
    useUpdateTranslationMutation();
  const [updateTerm, _termResult] = useUpdateTermMutation();
  const [generateAiDefinition, { isLoading }] =
    useGenerateAiDefinitionMutation();
  const [isEditing, setIsEditing] = useState(false);
  const [term, setTerm] = useState(bgt.term);
  const [definition, setDefinition] = useState(bgt.definition);
  const [useCache] = useState(true);

  const [triggerTranslate, { isLoading: isLoadingTranslation }] =
    useLazyTranslateTextQuery();

  const handleSave = async () => {
    setIsEditing(false);

    const payload = {
      id: bgt.id,
      term,
      definition,
    };

    await updateTranslation(payload).unwrap();
    await updateTerm({ slug, approvalStatus: ApprovalStatus.Pending });
  };

  const handleDiscard = () => {
    setTerm(bgt.term);
    setDefinition(bgt.definition);
    setIsEditing(false);
  };

  const handleGenerateTranslation = async () => {
    const { translatedText } = await triggerTranslate({
      text: arabicText,
      target: bgt.lang,
    }).unwrap();

    setDefinition(translatedText);
  };

  const handleGenerateAiDefinition = async () => {
    const { definition: generatedAiDefinition } = await generateAiDefinition({
      slug,
      term,
      native,
      verseRef,
      useCache,
    }).unwrap();

    setDefinition(generatedAiDefinition);
  };

  return (
    <div className={styles.card}>
      <div className={styles.lang}>
        <p>
          {flagMap[bgt.lang]} {t(`lang:${bgt.lang}`)}
        </p>
      </div>

      <div className={styles.term}>
        {!isEditing ? (
          <p>{term}</p>
        ) : (
          <input
            type="text"
            className={styles.termInput}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        )}
        <div className={styles.actions}>
          {!isEditing ? (
            <>
              <button
                className={styles.editBtn}
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              {/* <button className={styles.deleteBtn} onClick={() => { }}>
                Delete
              </button> */}
            </>
          ) : (
            <>
              {bgt.lang === Lang.ARABIC ? (
                <button
                  className={styles.saveBtn}
                  onClick={handleGenerateAiDefinition}
                >
                  Ai Define {isLoading && <Spinner size="1rem" />}
                </button>
              ) : (
                <button
                  className={styles.saveBtn}
                  onClick={handleGenerateTranslation}
                >
                  Translate {isLoadingTranslation && <Spinner size="1rem" />}
                </button>
              )}
              <button className={styles.saveBtn} onClick={handleSave}>
                Save
              </button>
              <button className={styles.discardBtn} onClick={handleDiscard}>
                Discard
              </button>
            </>
          )}
        </div>
      </div>

      {!isEditing ? (
        <div className={styles.definition} dir={getDirection(bgt.lang)}>
          <ReactMarkdown>{definition || ""}</ReactMarkdown>
        </div>
      ) : (
        <textarea
          className={styles.textarea}
          value={definition}
          onChange={(e) => setDefinition(e.target.value)}
          dir={getDirection(bgt.lang)}
        />
      )}
    </div>
  );
};

export default GlossaryTermDesc;
