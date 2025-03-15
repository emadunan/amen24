"use client"

import React, { FC, ReactNode, useState } from "react";
import styles from "./HighlightVerse.module.css";

interface Props {
  children: ReactNode;
}

const HighlightVerse: FC<Props> = ({ children }) => {
  const [highlighted, setHighlighted] = useState(false);

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
