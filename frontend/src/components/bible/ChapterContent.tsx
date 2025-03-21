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
import { showToast } from "@/utils/toast";

interface Props {
  children: ReactNode;
  bookKey: BookKey;
  chapterNo: number;
  verses: Verse[];
}

interface highlightState {
  highlighted: number[];
  toggleHighlight: (verseNo: number) => void;
  copyHighlighted: () => void;
  clearHighlighted: () => void;
}

const HighlightContext = createContext<highlightState | null>(null);

const ChapterContent: FC<Props> = ({
  children,
  bookKey,
  chapterNo,
  verses,
}) => {  
  const { t, i18n } = useTranslation("book");
  const [highlighted, setHighlighted] = useState<number[]>([]);

  function toggleHighlight(verseNo: number) {
    setHighlighted((prev) =>
      prev.includes(verseNo)
        ? prev.filter((num) => num !== verseNo)
        : [...prev, verseNo],
    );
  }

  function copyHighlighted() {
    const highlightedVerses = verses
      .filter((v) => highlighted.includes(v.verseNo))
      .sort((a, b) => a.verseNo - b.verseNo);

    if (highlightedVerses.length === 0) return; // Prevents errors

    // Extract and format numbers safely
    const formattedChapterNo = formatNumber(chapterNo, i18n.language as Lang);

    // Build verse text with ".." for non-sequential verses
    let previousVerseNo: number | null = null;
    const verseString = highlightedVerses
      .map((v) => {
        const verseText = v.text;
        const separator =
          previousVerseNo !== null && v.verseNo !== previousVerseNo + 1
            ? " .. "
            : " ";
        previousVerseNo = v.verseNo;
        return separator + verseText;
      })
      .join("")
      .trim(); // Trim to remove leading separator if present

    // Get formatted verse numbers
    const firstVerseNo = highlightedVerses[0]?.verseNo;
    const lastVerseNo = highlightedVerses[highlightedVerses.length - 1]?.verseNo;
    const formattedFirstVerseNo = formatNumber(
      firstVerseNo,
      i18n.language as Lang,
    );
    const formattedLastVerseNo = formatNumber(
      lastVerseNo,
      i18n.language as Lang,
    );

    // Construct formatted string
    const verseRefString = `(${t(bookKey)} ${formattedChapterNo} : ${formattedFirstVerseNo}${formattedFirstVerseNo !== formattedLastVerseNo
        ? ` - ${formattedLastVerseNo}`
        : ""
      })`;
    const formattedText = `${verseString} ${verseRefString}`;

    // Copy to clipboard
    navigator.clipboard.writeText(formattedText).then(
      () => showToast(`${verseRefString} ${t("toolbox.copiedToClipboard")}`),
      (err) => console.error("Failed to copy: ", err),
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
