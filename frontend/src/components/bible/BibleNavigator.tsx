"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Accordion from "./BookAccordion";
import styles from "./BibleNavigator.module.css";
import { BookKey, BookMap, formatNumber, Lang } from "@amen24/shared";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { close, selectNavigator } from "@/store/navigatorSlice";
import { RxDragHandleDots2 } from "react-icons/rx";
import { useParams, usePathname } from "next/navigation";
import { useDraggable } from "@/hooks/useDraggable";
import { useTranslation } from "react-i18next";
import CloseDraggableBtn from "../ui/CloseDraggableBtn";

const BibleNavigator = () => {
  const isOpen = useSelector(selectNavigator);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const params = useParams<{ book: [BookKey, string, string] }>();
  const { t, i18n } = useTranslation();
  const headerRef = useRef<HTMLDivElement | null>(null);

  const bookParams = params.book ?? []; // Ensure it's an array
  const [urlBookKey, chapterNum] = bookParams as [BookKey?, string?, string?];

  const { position, handleMouseDown, handleTouchStart, elementRef } =
    useDraggable(5, 5, i18n.language === "ar" ? true : false, 12, headerRef);

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
        <h4>{t("bibleIndex")}</h4>
        <CloseDraggableBtn onClose={() => dispatch(close())} />
      </div>
      <div className={styles.navigatorBody}>
        {Object.values(BookMap).map((book) => (
          <Accordion
            key={book.id}
            bookKey={book.key as BookKey}
            openBook={openBook}
            onOpenBook={handleOpenBook}
          >
            {openBook === book.key ? (
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
                          book.key === urlBookKey
                          ? styles.currentChapter
                          : ""
                      }
                      key={chapterIndex}
                      href={`/${book.key}/${chapterIndex}/${book.len}`}
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
