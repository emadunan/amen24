import React from "react";
import styles from "./GlossaryVerse.module.css";
import { BookKey, Lang, resolveRenderLang } from "@amen24/shared";
import { getDirection } from "@amen24/ui";

interface Props {
  text: string;
  lang: Lang;
  bookKey: BookKey;
}

const GlossaryVerse: React.FC<Props> = ({ text, lang, bookKey }) => {
  const words: string[] = text.trim().split(/\s+/);

  const renderLang: Lang = resolveRenderLang(lang, bookKey);
  const dir = getDirection(renderLang);

  if (!text?.trim()) return <div className={styles.verse}>—</div>;

  return (
    <div dir={dir} className={styles.verse}>
      {words.map((w, i) => (
        <span className={styles.word} key={i}>
          {w}
        </span>
      ))}
    </div>
  );
};

export default GlossaryVerse;
