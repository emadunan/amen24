"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import React, { FC, ReactNode, useEffect, useMemo } from "react";

interface Props {
  children: ReactNode;
  verseNum: number;
}

const VerseHighlight: FC<Props> = ({ children, verseNum }) => {
  const { highlighted, toggleHighlight } = useHighlightContext();

  const searchParams = useSearchParams();

  const highlightedNum = useMemo(() => {
    const param = searchParams.get("v");
    return param ? +param : null;
  }, [searchParams]);

  useEffect(() => {
    if (highlightedNum === verseNum) {
      toggleHighlight(verseNum);
    }
  }, [highlightedNum, verseNum]);

  return (
    <div
      onClick={toggleHighlight.bind(undefined, verseNum)}
      className={`${styles.verseContainer} ${highlighted.includes(verseNum) ? styles.highlight : ""}`}
    >
      {children}
    </div>
  );
};

export default VerseHighlight;
