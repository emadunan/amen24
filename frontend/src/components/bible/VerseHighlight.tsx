"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import React, { FC, ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  verseNum: number;
}

const VerseHighlight: FC<Props> = ({ children, verseNum }) => {
  const { highlighted, toggleHighlight } = useHighlightContext();
  const searchParams = useSearchParams();
  
  // Ensure it only runs once
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      const highlightedNum = searchParams.get("v");

      if (highlightedNum && +highlightedNum === verseNum && !highlighted.includes(verseNum)) {
        toggleHighlight(verseNum);
      }
      
      isFirstLoad.current = false; // Prevents future updates
    }
  }, []); // Runs only once on mount

  return (
    <div
      onClick={() => toggleHighlight(verseNum)}
      className={`${styles.verseContainer} ${highlighted.includes(verseNum) ? styles.highlight : ""}`}
    >
      {children}
    </div>
  );
};

export default VerseHighlight;
