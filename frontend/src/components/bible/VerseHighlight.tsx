"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import { MdPushPin } from "react-icons/md";
import { useGetUserLastReadBookmarkQuery } from "@/store/bookmarkApi";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  children: ReactNode;
  verseId: number;
}

const VerseHighlight: FC<Props> = ({ children, verseId }) => {
  const { highlighted, toggleHighlight } = useHighlightContext();
  const searchParams = useSearchParams();

  // Ensure it only runs once
  const isFirstLoad = useRef(true);
  const [isClient, setIsClient] = useState(false);

  const { data: bookmark } = useGetUserLastReadBookmarkQuery();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      const highlightedIds = searchParams.getAll("v").map(Number);

      if (highlightedIds.includes(verseId) && !highlighted.includes(verseId)) {
        toggleHighlight(verseId);
      }

      isFirstLoad.current = false;
    }
  }, []);

  const isBookmarked = bookmark?.verse.id === verseId;

  return (
    <div
      onClick={() => toggleHighlight(verseId)}
      className={`${styles.verseContainer} ${highlighted.includes(verseId) ? styles.highlight : ""}`}
    >
      {isBookmarked && isClient && <MdPushPin size="1.4rem" />}
      {children}
    </div>
  );
};

export default VerseHighlight;
