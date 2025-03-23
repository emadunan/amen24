"use client";

import styles from "./VerseHighlight.module.css";
import { useSearchParams } from "next/navigation";
import { useHighlightContext } from "./ChapterContent";
import React, { FC, ReactNode, useEffect, useRef } from "react";
import { MdPushPin } from "react-icons/md";
import { useGetUserBookmarksQuery } from "@/store/bookmarkApi";
import { BookKey } from "@amen24/shared";

interface Props {
  children: ReactNode;
  bookKey: BookKey;
  chapterNo: number;
  verseNo: number;
}

const VerseHighlight: FC<Props> = ({
  children,
  bookKey,
  chapterNo,
  verseNo,
}) => {
  const { highlighted, toggleHighlight } = useHighlightContext();
  const searchParams = useSearchParams();

  // Ensure it only runs once
  const isFirstLoad = useRef(true);

  const { data: bookmarks } = useGetUserBookmarksQuery();

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

  const isBookmarked = bookmarks?.some(
    (bookmark) =>
      bookmark.bookKey === bookKey &&
      bookmark.chapterNo === chapterNo &&
      bookmark.verseNo === verseNo,
  );

  return (
    <div
      onClick={() => toggleHighlight(verseNo)}
      className={`${styles.verseContainer} ${highlighted.includes(verseNo) ? styles.highlight : ""}`}
    >
      {isBookmarked && <MdPushPin size="1.4rem" />}
      {children}
    </div>
  );
};

export default VerseHighlight;
