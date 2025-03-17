"use client";

import React from "react";
import Accordion from "./BookAccordion";
import styles from "./BibleNavigator.module.css";
import { BookKeys } from "@amen24/shared";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectNavigator } from "@/store/navigatorSlice";

const BibleNavigator = () => {
  const isOpen = useSelector(selectNavigator);

  if (!isOpen) return null;

  return (
    <div className={styles.navigation}>
      {Object.values(BookKeys).map((book) => (
        <Accordion key={book.title.en} title={book.title.ar}>
          <div className={styles.chaptersContainer}>
            {Array.from({ length: book.len }, (_, i) => i + 1).map(
              (chapter) => (
                <Link
                  key={chapter}
                  href={`/${book.id}/${book.key}/${book.len}/${chapter}`}
                >
                  {chapter}
                </Link>
              ),
            )}
          </div>
        </Accordion>
      ))}
    </div>
  );
};

export default BibleNavigator;
