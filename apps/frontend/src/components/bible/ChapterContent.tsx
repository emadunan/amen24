"use client";

import React, {
  FC,
  ReactNode,
  useState,
  useContext,
  createContext,
} from "react";
import styles from "./ChapterContent.module.css";
import ChapterToolbox from "../chapter-toolbox/ChapterToolbox";
import { BookKey, BookMap, formatNumber, Lang, Verse } from "@amen24/shared";
import { useTranslation } from "react-i18next";
import { showToast } from "@amen24/ui";

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

export function useHighlightContext() {
  const context = useContext(HighlightContext);

  if (!context)
    throw new Error("useHighlightContext must be used within a ChapterContent");

  return context;
}

const ChapterContent: FC<Props> = ({
  children,
  bookKey,
  chapterNum,
  verses,
}) => {
  const { t, i18n } = useTranslation(["common", "book"]);
  const [highlighted, setHighlighted] = useState<number[]>([]);

  function toggleHighlight(verseId: number) {
    setHighlighted((prev) =>
      prev.includes(verseId)
        ? prev.filter((num) => num !== verseId)
        : [...prev, verseId],
    );
  }

  function copyHighlighted() {
    const highlightedVerses = verses
      .filter((v) => highlighted.includes(v.id))
      .sort((a, b) => a.id - b.id);

    if (highlightedVerses.length === 0) return; // Prevents errors

    // Extract and format numbers safely
    const formattedChapterNum = formatNumber(chapterNum, i18n.language as Lang);

    // Build verse text with ".." for non-sequential verses
    let previousVerseNum: number | null = null;
    const verseString = highlightedVerses
      .map((v) => {
        const verseText = v.verseTranslations[0].text;
        const separator =
          previousVerseNum !== null && v.num !== previousVerseNum + 1
            ? " .. "
            : " ";
        previousVerseNum = v.num;
        return separator + verseText;
      })
      .join("")
      .trim(); // Trim to remove leading separator if present

    const queryParameters = `v=${highlighted.sort((a, b) => a - b).join(",")}`;

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
    const verseRefString = `(${t(`book:${bookKey}`)} ${formattedChapterNum} : ${formattedFirstVerseNum}${
      formattedFirstVerseNum !== formattedLastVerseNum
        ? ` - ${formattedLastVerseNum}`
        : ""
    })`;

    const baseUrl = `https://amen24.org/${i18n.language}`;
    const passageUrl = `${baseUrl}/${bookKey}/${chapterNum}/${BookMap[bookKey].len}?${queryParameters}`;

    const formattedText = `${verseString} ${verseRefString}\n\n${t("main.readMore")}: ${passageUrl}`;

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