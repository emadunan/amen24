"use client";

import { useState } from "react";
import styles from "./BibleSearch.module.css";
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";
import { FiFilter } from "react-icons/fi";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { BookKey } from "@amen24/shared";
import { useTranslation } from "react-i18next";

const books: string[] = Object.values(BookKey);

const bookList = ["ALL", "OTS", "NTS", ...books];
const oldTestamentBooks = books.slice(0, 39);
const newTestamentBooks = books.slice(39, 66);
const torahBooks = books.slice(0, 5);
const historicalBooks = books.slice(5, 17);
const wisdomBooks = books.slice(17, 22);
const propheticBooks = books.slice(22, 39);
const gospelsBooks = books.slice(39, 43);
const actsEpistlesBooks = books.slice(43, 65);
const apocalypticBooks = books.slice(65, 66);

// Constants for category keys
const categoryList = {
  ALL: books,
  OTS: oldTestamentBooks,
  NTS: newTestamentBooks,
  Torah: torahBooks,
  Historical: historicalBooks,
  Wisdom: wisdomBooks,
  Prophetic: propheticBooks,
  Gospels: gospelsBooks,
  Epistles: actsEpistlesBooks,
  Apocalyptic: apocalypticBooks,
};

export default function BibleSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([...bookList]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const { t } = useTranslation("book");

  const isWholeBibleSelected =
    selectedBooks.length === books.length + 3; // Includes WholeBible, OT, NT

  const isOldTestamentSelected = oldTestamentBooks.every(book => selectedBooks.includes(book));
  const isNewTestamentSelected = newTestamentBooks.every(book => selectedBooks.includes(book));

  const toggleBookSelection = (book: string) => {
    let updatedSelection = [...selectedBooks];

    if (book === "ALL") {
      // Select all books if "ALL" is checked
      updatedSelection = isWholeBibleSelected ? [] : ["ALL", "OTS", "NTS", ...books];
    } else if (book === "OTS") {
      updatedSelection = isOldTestamentSelected
        ? selectedBooks.filter((b) => !oldTestamentBooks.includes(b) && b !== "OTS")
        : [...selectedBooks, "OTS", ...oldTestamentBooks];
    } else if (book === "NTS") {
      updatedSelection = isNewTestamentSelected
        ? selectedBooks.filter((b) => !newTestamentBooks.includes(b) && b !== "NTS")
        : [...selectedBooks, "NTS", ...newTestamentBooks];
    } else {
      // Toggle individual books
      updatedSelection = selectedBooks.includes(book)
        ? selectedBooks.filter((b) => b !== book)
        : [...selectedBooks, book];
    }

    // Auto-select "OTS" if all OT books are checked
    if (oldTestamentBooks.every((b) => updatedSelection.includes(b))) {
      updatedSelection = [...new Set([...updatedSelection, "OTS"])];
    } else {
      updatedSelection = updatedSelection.filter((b) => b !== "OTS");
    }

    // Auto-select "NTS" if all NT books are checked
    if (newTestamentBooks.every((b) => updatedSelection.includes(b))) {
      updatedSelection = [...new Set([...updatedSelection, "NTS"])];
    } else {
      updatedSelection = updatedSelection.filter((b) => b !== "NTS");
    }

    // ✅ Auto-select "ALL" if both OT & NT are selected
    if (updatedSelection.includes("OTS") && updatedSelection.includes("NTS")) {
      updatedSelection = [...new Set([...updatedSelection, "ALL"])];
    } else {
      updatedSelection = updatedSelection.filter((b) => b !== "ALL");
    }

    setSelectedBooks(updatedSelection);
  };

  const handleSearch = () => {
    if (query.trim()) {
      // Fake search logic (Replace with actual API call)
      setResults([
        `Genesis 1:1 - In the beginning God created the heavens and the earth.`,
        `John 3:16 - For God so loved the world...`,
      ]);
    }
  };

  const clearSelection = () => {
    setSelectedBooks([]); // Reset selected books
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBox}>
        <FiFilter
          className={styles.filterIcon}
          onClick={() => setShowDropdown(!showDropdown)}
        />
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
            {/* Search Filter Inside Dropdown */}
            {/* <div className={styles.filterContainer}>
              <input
                className={styles.filterInput}
                type="text"
                placeholder={`${t("searchEngine.filterButtonText")} ...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {selectedBooks.length > 0 && (
                <AiOutlineClose
                  className={styles.clearFilterIcon}
                  onClick={clearSelection}
                />
              )}
            </div> */}

            <div className={styles.bookList}>
              {bookList
                .filter((book) =>
                  book.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((book) => (
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

      {/* Search Results */}
      {results.length > 0 && (
        <div className={styles.results}>
          {results.map((verse, idx) => (
            <div key={idx} className={styles.verse}>
              {verse}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
