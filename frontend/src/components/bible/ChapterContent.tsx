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

interface Props {
  children: ReactNode;
}

interface highlightState {
  highlighted: number[];
  toggleHighlight: (verseNum: number) => void;
  copyHighlighted: () => void;
  clearHighlighted: () => void;
}

const HighlightContext = createContext<highlightState | null>(null);

const ChapterContent: FC<Props> = ({ children }) => {
  const [highlighted, setHighlighted] = useState<number[]>([]);

  function toggleHighlight(verseNum: number) {
    setHighlighted((prev) =>
      prev.includes(verseNum)
        ? prev.filter((num) => num !== verseNum)
        : [...prev, verseNum],
    );
  }

  function copyHighlighted() {}

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
