"use client";

import styles from "./BibleSearch.module.css";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { FaCheckSquare, FaRegSquare, FaSync } from "react-icons/fa";
import { BookKey, BookMap, books, formatNumber, Lang } from "@amen24/shared";
import { useTranslation } from "react-i18next";
import VerseResult from "./VerseResult";
import Spinner from "../ui/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  setIsLoading,
  setQuery,
  setResults,
  setSelectedBooks,
  toggleDropdown,
} from "@/store/searchSlice";
import { showToast } from "@/utils/toast";
import { VerseResult as VerseResultInterface } from "@amen24/shared";
import { useShowError } from "@/hooks/useShowError";
import useBreakpoint from "@/hooks/useBreakpoint";

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

const BibleSearch = () => {
  const { t, i18n } = useTranslation(["book", "error"]);
  const { isRegularPhone } = useBreakpoint();
  const { showApiError } = useShowError();
  const dispatch = useDispatch();
  const { query, selectedBooks, showDropdown, results, isLoading } =
    useSelector((state: RootState) => state.search);

  const queryTerms = query.trim().split(" ");

  const isWholeBibleSelected =
    selectedBooks.length === Object.values(BookKey).length;

  const isCategorySelected = (category: string) =>
    categoryList[category]?.every((book) => selectedBooks.includes(book));

  const toggleBookSelection = (book: string) => {
    if (book === "WholeBible") {
      dispatch(
        setSelectedBooks(
          isWholeBibleSelected ? [] : [...Object.values(BookKey)],
        ),
      );
      return;
    }

    const selectedSet = new Set(selectedBooks);

    if (Object.values(BookKey).includes(book as BookKey)) {
      // Toggle single book selection
      if (selectedSet.has(book)) {
        selectedSet.delete(book);
      } else {
        selectedSet.add(book);
      }
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

    dispatch(setSelectedBooks(Array.from(selectedSet))); // Convert Set back to Array and update Redux state
  };

  async function handleSearch() {
    if (showDropdown) dispatch(toggleDropdown());

    if (query.trim().length < 3) {
      showToast(t("searchEngine.queryTooShort"), "warning");
      return;
    }

    if (selectedBooks.length === 0) {
      showToast(t("searchEngine.noBooksSelected"), "warning");
      return;
    }

    dispatch(setIsLoading(true));

    try {
      const response = await fetch(`${apiUrl}/verses/query`, {
        method: "POST",
        body: JSON.stringify({ query, selectedBooks }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("failedToFetch");

      const searchResult = await response.json();
      dispatch(setResults(Array.isArray(searchResult) ? searchResult : []));
    } catch (error) {
      console.error(error);
      showApiError(error);
    } finally {
      dispatch(setIsLoading(false));
    }
  }

  function handleClearForm() {
    dispatch(setQuery(""));
    dispatch(setResults([]));
    dispatch(setIsLoading(false));
    if (showDropdown) dispatch(toggleDropdown());
    dispatch(setSelectedBooks(Object.values(BookKey)));
  }

  return (
    <div className={styles.container}>
      <h2>{t("searchEngine.title")}</h2>
      <div className={styles.searchBox}>
        <button
          className={styles.filterBtn}
          onClick={() => dispatch(toggleDropdown())}
        >
          <FiFilter className={styles.filterIcon} />
        </button>
        <input
          type="text"
          placeholder={`${t("searchEngine.inviteMessage")} ...`}
          value={query}
          onChange={(e) => dispatch(setQuery(e.target.value))}
        />
        {query && (
          <AiOutlineClose
            className={styles.clearIcon}
            onClick={() => dispatch(setQuery(""))}
          />
        )}
        <button className={styles.searchBtn} onClick={handleSearch}>
          <AiOutlineSearch className={styles.searchIcon} />
          {!isRegularPhone && t("searchEngine.searchButtonText")}
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
      <div className={styles.results}>
        {isLoading ? (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        ) : (
          <>
            {results.length > 0 && (
              <div className={styles.resultsSummary}>
                <p>
                  {t("searchEngine.resultsCount")}:{" "}
                  {formatNumber(results.length, i18n.language as Lang)}
                </p>
                <button onClick={handleClearForm}>
                  <FaSync /> {t("searchEngine.resetSearch")}
                </button>
              </div>
            )}
            {results.map((verse: VerseResultInterface) => {
              const bookData = BookMap[verse.bookKey];
              if (!bookData) {
                console.warn(`Book key not found in BookMap: ${verse.bookKey}`);
                return null;
              }

              return (
                <VerseResult
                  key={verse.id}
                  totalChapters={bookData.len}
                  bookKey={verse.bookKey}
                  chapterNum={verse.chapterNum}
                  verseNum={verse.verseNum}
                  verseId={verse.id}
                  text={verse.text}
                  lang={verse.lang}
                  queryTerms={queryTerms}
                />
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default BibleSearch;
