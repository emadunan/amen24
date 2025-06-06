import React, { ChangeEvent, FormEvent } from "react";
import styles from "./GlossaryFilterForm.module.css";
import { FaFilter, FaSync } from "react-icons/fa";
import { TFunction } from "i18next";
import { BookKey, BookMap } from "@amen24/shared";

interface Props {
  t: TFunction;
  ui?: "basic" | "advanced";
  query: string;
  bookKey?: string,
  chapter?: string;
  onQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBookChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onChapterChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onReset: () => void;
}

export const GlossaryFilterForm: React.FC<Props> = ({
  t,
  ui = "basic",
  query,
  bookKey,
  chapter,
  onBookChange,
  onChapterChange,
  onQueryChange,
  onSubmit,
  onReset,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        value={query}
        onChange={onQueryChange}
        placeholder={t("common:glossary.filterPlaceholder")}
      />
      {ui === "advanced" && (
        <>
          <select className={styles.select} onChange={onBookChange} value={bookKey || ""}>
            <option value=""></option>
            {Object.values(BookKey).map(bk => <option key={bk} value={bk}>{BookMap[bk].title.en}</option>)}
          </select>
          {bookKey && (
            <select className={styles.select} onChange={onChapterChange} value={chapter ?? ""}>
              <option value=""></option>
              {Array.from({ length: BookMap[bookKey as BookKey].len }, (_, i) => <option key={i + 1} value={i + 1}>{i + 1}</option>)}
            </select>
          )}
        </>
      )}
      <button className={styles.button} type="button" onClick={onReset}>
        <FaSync />
      </button>
      <button className={styles.button} type="submit">
        <FaFilter />
        {t("glossary.filter")}
      </button>
    </form>
  );
};
