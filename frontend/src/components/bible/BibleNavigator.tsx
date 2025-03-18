"use client";

import React, { useEffect } from "react";
import Accordion from "./BookAccordion";
import styles from "./BibleNavigator.module.css";
import { BookKeys } from "@amen24/shared";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { close, selectNavigator } from "@/store/navigatorSlice";
import { RxDragHandleDots2 } from "react-icons/rx";
import { usePathname } from "next/navigation";
import { useDraggable } from "@/hooks/useDraggable";

const BibleNavigator = () => {
  const isOpen = useSelector(selectNavigator);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { position, handleMouseDown, elementRef } = useDraggable(1400, 100);

  const isBookChapterPage = /^\/[a-z]{2}\/\d+\/[^/]+\/\d+\/\d+$/.test(pathname);

  useEffect(() => {
    if (!isBookChapterPage) {
      dispatch(close());
    }
  }, [isBookChapterPage, dispatch]);

  if (!isOpen || !isBookChapterPage) return null;

  return (
    <div
      className={styles.navigator}
      ref={elementRef}
      onMouseDown={handleMouseDown}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div className={styles.navigatorHeader}>
        <RxDragHandleDots2 />
        <h4>الفهرس</h4>
      </div>
      <div className={styles.navigatorBody}>
        {Object.values(BookKeys).map((book) => (
          <Accordion key={book.title.en} title={book.title.ar}>
            <div className={styles.chaptersContainer}>
              {Array.from({ length: book.len }, (_, i) => (
                <Link key={i} href={`/${book.id}/${book.key}/${book.len}/${i}`}>
                  {i}
                </Link>
              ))}
            </div>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default BibleNavigator;
