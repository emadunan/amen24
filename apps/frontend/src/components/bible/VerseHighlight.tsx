"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import { MdPushPin } from "react-icons/md";
import { useGetUserLastReadProgressQuery } from "@/store/apis/progressApi";
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

  const { data: progress } = useGetUserLastReadProgressQuery();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isFirstLoad.current) {
      // const highlightedIds = searchParams.getAll("v").map(Number);
      const verseParam = searchParams.get("v");

      if (verseParam) {
        const highlightedIds = verseParam
          .split(",")
          .map((id) => parseInt(id, 10))
          .filter((n) => !isNaN(n));

        if (
          highlightedIds.includes(verseId) &&
          !highlighted.includes(verseId)
        ) {
          toggleHighlight(verseId);
        }
      }

      isFirstLoad.current = false;
    }
  }, []);

  const isProgressed = progress?.verse.id === verseId;

  return (
    <div
      onClick={() => toggleHighlight(verseId)}
      className={`${styles.verseContainer} ${highlighted.includes(verseId) ? styles.highlight : ""}`}
    >
      {isProgressed && isClient && <MdPushPin size="1.4rem" />}
      {children}
    </div>
  );
};

export default VerseHighlight;
