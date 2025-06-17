"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Accordion from "./BookAccordion";
import styles from "./BibleNavigator.module.css";
import { BookKey, BookMap, formatNumber, Lang } from "@amen24/shared";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { close, selectNavigator } from "@/store/slices/navigatorSlice";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useParams, usePathname } from "next/navigation";
import { isRtl, useDraggable } from "@amen24/ui";
import { useTranslation } from "react-i18next";
import CloseDraggableBtn from "../ui/CloseDraggableBtn";

const BibleNavigator = () => {
  const isOpen = useSelector(selectNavigator);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams<{ book: [BookKey, string, string] }>();
  const { t, i18n } = useTranslation();
  const headerRef = useRef<HTMLDivElement | null>(null);
  const isRTL = isRtl(i18n.language as Lang);

  const bookParams = params.book ?? []; // Ensure it's an array
  const [urlBookKey, chapterNum] = bookParams as [BookKey, string, string];

  const { position, handleMouseDown, handleTouchStart, elementRef } =
    useDraggable(5, 5, isRTL, 12, headerRef);

  const isBookChapterPage = /^\/(?:[a-z]{2}\/)?[A-Z0-9]+\/\d+\/\d+$/.test(
    pathname,
  );

  const [openBook, setOpenBook] = useState<BookKey | null>(null);

  // Ref for the current chapter element
  const chapterRefs = useRef<Map<number, HTMLAnchorElement | null>>(new Map());

  const handleOpenBook = useCallback((key: BookKey) => {
    setOpenBook((prev) => (prev === key ? null : key));
  }, []);

  useEffect(() => {
    if (urlBookKey) {
      setOpenBook(urlBookKey);
    }
  }, [urlBookKey, isOpen]);

  useEffect(() => {
    if (!isBookChapterPage && isOpen) {
      dispatch(close());
    }
  }, [isBookChapterPage, isOpen]);

  // Scroll to the current chapter
  useEffect(() => {
    if (chapterNum) {
      const chapterIndex = parseInt(chapterNum, 10);
      const chapterElement = chapterRefs.current.get(chapterIndex);

      if (chapterElement) {
        chapterElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  }, [chapterNum, openBook, isOpen]);

  if (!isOpen || !isBookChapterPage) return null;

  return (
    <div
      className={styles.navigator}
      ref={elementRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className={styles.navigatorHeader} ref={headerRef}>
        <RxDragHandleDots2 />
        <h4>{t("main.bibleIndex")}</h4>
        <CloseDraggableBtn onClose={() => dispatch(close())} absolute />
      </div>
      <div className={styles.navigatorBody}>
        {Object.values(BookMap).map((book) => (
          <Accordion
            key={book.id}
            bookKey={urlBookKey}
            openBook={openBook}
            onOpenBook={handleOpenBook}
          >
            {openBook === urlBookKey ? (
              <div className={styles.chaptersContainer}>
                {Array.from({ length: book.len }, (_, i) => {
                  const chapterIndex = i + 1;
                  const formattedNum = formatNumber(
                    chapterIndex,
                    i18n.language as Lang,
                  );
                  return (
                    <Link
                      className={
                        chapterIndex.toString() === chapterNum &&
                        urlBookKey === urlBookKey
                          ? styles.currentChapter
                          : ""
                      }
                      key={chapterIndex}
                      href={`/${urlBookKey}/${chapterIndex}/${book.len}`}
                      ref={(el) => {
                        chapterRefs.current.set(chapterIndex, el);
                      }}
                    >
                      {formattedNum}
                    </Link>
                  );
                })}
              </div>
            ) : null}
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default BibleNavigator;
