import React from "react";
import styles from "./GlossaryVerse.module.css";
import { BookKey, Lang, resolveRenderLang, sanitizeWord } from "@amen24/shared";
import { getDirection } from "@amen24/ui";
import { ActiveLang } from "./glossaryReducer";

interface Props {
  text: string;
  lang: Lang;
  bookKey: BookKey;
  selectedWords: string[];
  onToggleTerm: (lang: ActiveLang, word: string) => void;
}

const GlossaryVerse: React.FC<Props> = ({
  text,
  lang,
  bookKey,
  selectedWords,
  onToggleTerm,
}) => {
  const words: string[] = text.trim().split(/\s+/);

  const renderLang: Lang = resolveRenderLang(lang, bookKey);
  const dir = getDirection(renderLang);

  if (!text?.trim()) return <div className={styles.verse}>—</div>;

  return (
    <div dir={dir} className={styles.verse}>
      {words.map((w, i) => (
        <span className={`${styles.word} ${selectedWords.includes(sanitizeWord(w)) ? styles.highlight : ""}`} key={i} onClick={onToggleTerm.bind(null, lang as ActiveLang, w)}>
          {w}
        </span>
      ))}
    </div>
  );
};

export default GlossaryVerse;
