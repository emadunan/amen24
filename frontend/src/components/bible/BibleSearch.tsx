"use client";

import { useState } from "react";
import styles from "./BibleSearch.module.css";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { BookKey, BookKeys, books, formatNumber, Lang, VerseResultData } from "@amen24/shared";
import { useTranslation } from "react-i18next";
import VerseResult from "./VerseResult";
import Spinner from "../ui/Spinner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const oldTestamentBooks = books.slice(0, 39);
const newTestamentBooks = books.slice(39, 66);
const torahBooks = books.slice(0, 5);
const historicalBooks = books.slice(5, 17);
const wisdomBooks = books.slice(17, 22);
const propheticBooks = books.slice(22, 39);
const gospelsBooks = books.slice(39, 43);
const actsEpistlesBooks = books.slice(43, 66);

const categoryList: Record<string, string[]> = {
  WholeBible: Object.values(BookKey),
  OldTestament: oldTestamentBooks,
  NewTestament: newTestamentBooks,
  Torah: torahBooks,
  Historical: historicalBooks,
  Wisdom: wisdomBooks,
  Prophetic: propheticBooks,
  Gospels: gospelsBooks,
  Epistles: actsEpistlesBooks,
};

export default function BibleSearch() {
  const [query, setQuery] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>(books);
  const [showDropdown, setShowDropdown] = useState(false);
  const [result, setResult] = useState<VerseResultData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation("book");

  const isWholeBibleSelected =
    selectedBooks.length === Object.values(BookKey).length;

  const isCategorySelected = (category: string) =>
    categoryList[category]?.every((book) => selectedBooks.includes(book));

  const toggleBookSelection = (book: string) => {
    if (book === "WholeBible") {
      setSelectedBooks(isWholeBibleSelected ? [] : [...Object.values(BookKey)]);
      return;
    }

    setSelectedBooks((prevSelected) => {
      const selectedSet = new Set(prevSelected);

      if (Object.values(BookKey).includes(book as BookKey)) {
        // Toggle single book selection
        selectedSet.has(book)
          ? selectedSet.delete(book)
          : selectedSet.add(book);
      } else if (categoryList[book]) {
        // Toggle category selection
        const allBooksInCategory = new Set(categoryList[book]);
        const allSelected = categoryList[book].every((b) => selectedSet.has(b));

        if (allSelected) {
          allBooksInCategory.forEach((b) => selectedSet.delete(b));
        } else {
          allBooksInCategory.forEach((b) => selectedSet.add(b));
        }
      }

      return [...selectedSet]; // Convert Set back to Array
    });
  };

  async function handleSearch() {
    setShowDropdown(false);
    setIsLoading(true);
    const response = await fetch(`${apiUrl}/verses/query`, {
      method: "POST",
      body: JSON.stringify({ query, selectedBooks }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("failedToFetch");

    const searchResult = await response.json();

    setResult(searchResult);
    setIsLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <button
          className={styles.filterBtn}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FiFilter className={styles.filterIcon} />
        </button>
        <input
          type="text"
          placeholder={`${t("searchEngine.inviteMessage")} ...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <AiOutlineClose
            className={styles.clearIcon}
            onClick={() => setQuery("")}
          />
        )}
        <button className={styles.searchBtn} onClick={handleSearch}>
          <AiOutlineSearch className={styles.searchIcon} />
          {t("searchEngine.searchButtonText")}
        </button>

        {showDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.bookList}>
              {Object.keys(categoryList).map((category) => (
                <label key={category} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={isCategorySelected(category)}
                    onChange={() => toggleBookSelection(category)}
                  />
                  {isCategorySelected(category) ? (
                    <FaCheckSquare className={styles.checkIcon} />
                  ) : (
                    <FaRegSquare className={styles.checkIcon} />
                  )}
                  {t(category)}
                </label>
              ))}
              <div className={styles.separator} />
              {books.map((book) => (
                <label key={book} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={selectedBooks.includes(book)}
                    onChange={() => toggleBookSelection(book)}
                  />
                  {selectedBooks.includes(book) ? (
                    <FaCheckSquare className={styles.checkIcon} />
                  ) : (
                    <FaRegSquare className={styles.checkIcon} />
                  )}
                  {t(book)}
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: "1rem" }}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            {result.length > 0 && (
              <p style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>
                {t("searchEngine.resultsCount")}: {formatNumber(result.length, i18n.language as Lang)}
              </p>
            )}
            {result.map((verse: VerseResultData) => (
              <VerseResult
                totalChapters={BookKeys[verse.bookKey].len}
                bookId={verse.bookId}
                key={verse.id}
                bookKey={verse.bookKey}
                chapterNumber={verse.chapterNumber}
                verseNumber={verse.verseNumber}
                text={verse.text}
                lang={verse.lang}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
