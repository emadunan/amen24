import React, { FC } from "react";
import styles from "./GlossaryVerse.module.css";
import { BookKey, flagMap, Lang, resolveRenderLang } from "@amen24/shared";
import { getDirection } from "@amen24/ui";
import { ActiveLang } from "./glossaryReducer";
import { AiOutlineClear } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import { useCheckTermByTitleQuery } from "@/store/apis/glossaryApi";
import SmallSpinner from "../ui/SmallSpinner";

interface Props {
  text: string;
  lang: ActiveLang;
  bookKey: BookKey;
  selectedWords: string[];
  onAddWordToTerm: (lang: ActiveLang, word: string) => void;
  onClearTerm: (lang?: ActiveLang) => void;
}

interface VerifiedProps {
  isLoading: boolean;
  isFound?: boolean;
  term: string;
}

const Verified: FC<VerifiedProps> = ({ isLoading, isFound, term }) => {
  if (!term.trim()) return null;
  if (isLoading) return <SmallSpinner />;
  if (isFound) return <MdVerified color="green" />;
  return null;
};

const GlossaryVerse: React.FC<Props> = ({
  text,
  lang,
  bookKey,
  selectedWords,
  onAddWordToTerm,
  onClearTerm,
}) => {
  const term = selectedWords.join(" ").toLowerCase();
  const shouldQuery = term.trim().length > 0;
  const words: string[] = text.trim().split(/\s+/);
  const { data: isFound, isLoading } = useCheckTermByTitleQuery(term, {
    skip: !shouldQuery,
  });

  const renderLang: Lang = resolveRenderLang(lang, bookKey);
  const dir = getDirection(renderLang);

  if (!text?.trim()) return <div className={styles.verse}>—</div>;

  return (
    <div className={styles.verse}>
      <div className={styles.verseFlag}>{flagMap[lang]}</div>
      <div className={styles.term}>
        <p>
          {term}{" "}
          <Verified isLoading={isLoading} isFound={isFound} term={term} />
        </p>
      </div>
      <div className={styles.clear} onClick={onClearTerm.bind(null, lang)}>
        <AiOutlineClear />
      </div>
      <div className={styles.verseText} dir={dir}>
        {words.map((w, i) => (
          <span
            className={`${styles.word}`}
            key={i}
            onClick={onAddWordToTerm.bind(null, lang as ActiveLang, w)}
          >
            {w}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GlossaryVerse;
