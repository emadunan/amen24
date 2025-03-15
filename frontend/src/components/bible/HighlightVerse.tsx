"use client";

import React, { FC, ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./HighlightVerse.module.css";
import { useSearchParams } from "next/navigation";

interface Props {
  children: ReactNode;
  verseNum?: number;
}

const HighlightVerse: FC<Props> = ({ children, verseNum }) => {
  const [highlighted, setHighlighted] = useState(false);
  const searchParams = useSearchParams();

  const highlightedNum = useMemo(() => {
    const param = searchParams.get("v");
    return param? +param : null;
  }, [searchParams]);

  useEffect(() => {
    if (highlightedNum === verseNum) {
      setHighlighted(true);
    }
  }, []);

  function handleHighlight() {
    setHighlighted((prev) => !prev);
  }

  return (
    <div
      onClick={handleHighlight}
      className={`${styles.verseContainer} ${highlighted ? styles.highlight : ""}`}
    >
      {children}
    </div>
  );
};

export default HighlightVerse;
