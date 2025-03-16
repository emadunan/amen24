"use client";

import React, {
  FC,
  ReactNode,
  useState,
  useContext,
  createContext,
} from "react";
import styles from "./ChapterContent.module.css";
import ChapterToolbox from "./ChapterToolbox";
import { BookKey, formatNumber, Lang, Verse } from "@amen24/shared";
import { useTranslation } from "react-i18next";

interface Props {
  children: ReactNode;
  bookKey: BookKey;
  chapterNum: number;
  verses: Verse[];
}

interface highlightState {
  highlighted: number[];
  toggleHighlight: (verseNum: number) => void;
  copyHighlighted: () => void;
  clearHighlighted: () => void;
}

const HighlightContext = createContext<highlightState | null>(null);

const ChapterContent: FC<Props> = ({
  children,
  bookKey,
  chapterNum,
  verses,
}) => {
  const { t, i18n } = useTranslation("book");
  const [highlighted, setHighlighted] = useState<number[]>([]);

  function toggleHighlight(verseNum: number) {
    setHighlighted((prev) =>
      prev.includes(verseNum)
        ? prev.filter((num) => num !== verseNum)
        : [...prev, verseNum],
    );
  }

  function copyHighlighted() {
    const highlightedVerses = verses
      .filter((v) => highlighted.includes(v.num))
      .sort((a, b) => a.num - b.num);
  
    if (highlightedVerses.length === 0) return;
    
    // Extract formatted verse texts
    const verseString = highlightedVerses.map((v) => v.text).join(" ");
  
    // Extract and format numbers safely
    const firstVerseNum = highlightedVerses[0]?.num;
    const lastVerseNum = highlightedVerses[highlightedVerses.length - 1]?.num;
    const formattedChapterNum = formatNumber(chapterNum, i18n.language as Lang);
    const formattedFirstVerseNum = formatNumber(firstVerseNum, i18n.language as Lang);
    const formattedLastVerseNum = formatNumber(lastVerseNum, i18n.language as Lang);
  
    // Construct formatted string
    const formattedText = `${verseString} (${t(bookKey)} ${formattedChapterNum} : ${formattedFirstVerseNum}${
      formattedFirstVerseNum !== formattedLastVerseNum ? ` - ${formattedLastVerseNum}` : ""
    })`;
  
    // Copy to clipboard
    navigator.clipboard.writeText(formattedText).then(
      () => console.log("Copied to clipboard"),
      (err) => console.error("Failed to copy: ", err)
    );
  }
  

  function clearHighlighted() {
    setHighlighted([]);
  }

  const isHighlight = highlighted.length >= 1;

  return (
    <HighlightContext
      value={{
        highlighted,
        toggleHighlight,
        copyHighlighted,
        clearHighlighted,
      }}
    >
      {isHighlight && <ChapterToolbox />}
      <div className={styles.chapterContent}>{children}</div>
    </HighlightContext>
  );
};

export default ChapterContent;

export function useHighlightContext() {
  const context = useContext(HighlightContext);

  if (!context)
    throw new Error("useHighlightContext must be used within a ChapterContent");

  return context;
}
