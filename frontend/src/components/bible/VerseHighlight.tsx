"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import React, { FC, ReactNode, useEffect, useRef } from "react";

interface Props {
  children: ReactNode;
  verseNo: number;
}

const VerseHighlight: FC<Props> = ({ children, verseNo }) => {
  const { highlighted, toggleHighlight } = useHighlightContext();
  const searchParams = useSearchParams();

  // Ensure it only runs once
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      const highlightedNo = searchParams.get("v");

      if (
        highlightedNo &&
        +highlightedNo === verseNo &&
        !highlighted.includes(verseNo)
      ) {
        toggleHighlight(verseNo);
      }

      isFirstLoad.current = false;
    }
  }, []);

  return (
    <div
      onClick={() => toggleHighlight(verseNo)}
      className={`${styles.verseContainer} ${highlighted.includes(verseNo) ? styles.highlight : ""}`}
    >
      {children}
    </div>
  );
};

export default VerseHighlight;
