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

    if (highlightedVerses.length === 0) return; // Prevents errors

    console.log("handle copy highlighted verses");

    // Extract and format numbers safely
    const formattedChapterNum = formatNumber(chapterNum, i18n.language as Lang);

    // Build verse text with ".." for non-sequential verses
    let previousVerseNum: number | null = null;
    const verseString = highlightedVerses
      .map((v) => {
        const verseText = v.text;
        const separator =
          previousVerseNum !== null && v.num !== previousVerseNum + 1
            ? " .. "
            : " ";
        previousVerseNum = v.num;
        return separator + verseText;
      })
      .join("")
      .trim(); // Trim to remove leading separator if present

    // Get formatted verse numbers
    const firstVerseNum = highlightedVerses[0]?.num;
    const lastVerseNum = highlightedVerses[highlightedVerses.length - 1]?.num;
    const formattedFirstVerseNum = formatNumber(
      firstVerseNum,
      i18n.language as Lang,
    );
    const formattedLastVerseNum = formatNumber(
      lastVerseNum,
      i18n.language as Lang,
    );

    // Construct formatted string
    const verseRefString = `(${t(bookKey)} ${formattedChapterNum} : ${formattedFirstVerseNum}${
      formattedFirstVerseNum !== formattedLastVerseNum
        ? ` - ${formattedLastVerseNum}`
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
