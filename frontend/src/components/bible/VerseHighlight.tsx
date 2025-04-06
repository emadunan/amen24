"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { MdPushPin } from "react-icons/md";
import { useGetUserLastReadBookmarkQuery } from "@/store/bookmarkApi";
import { BookKey } from "@amen24/shared";

interface Props {
  children: ReactNode;
  bookKey: BookKey;
  chapterNum: number;
  verseNum: number;
}

const VerseHighlight: FC<Props> = ({
  children,
  bookKey,
  chapterNum,
  verseNum,
}) => {
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
      const highlightedNo = searchParams.get("v");

      if (
        highlightedNo &&
        +highlightedNo === verseNum &&
        !highlighted.includes(verseNum)
      ) {
        toggleHighlight(verseNum);
      }

      isFirstLoad.current = false;
    }
  }, []);

  const isBookmarked =
    bookmark?.verse.chapter.book.bookKey === bookKey &&
    bookmark?.verse.chapter.num === chapterNum &&
    bookmark?.verse.num === verseNum;

  return (
    <div
      onClick={() => toggleHighlight(verseNum)}
      className={`${styles.verseContainer} ${highlighted.includes(verseNum) ? styles.highlight : ""}`}
    >
      {isBookmarked && isClient && <MdPushPin size="1.4rem" />}
      {children}
    </div>
  );
};

export default VerseHighlight;
