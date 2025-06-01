"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import { Lang } from "@amen24/shared";
import { useGetAllTermsQuery } from "@/store/apis/glossaryApi";

import BibleGlossaryClientItem from "@/components/Glossary/BibleGlossaryClientItem";
import GlossaryContainer from "./GlossaryContainer";
import styles from "./BibleGlossaryClient.module.css";

const ITEMS_PER_PAGE = 2;

const BibleGlossaryClient = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState('');
  const [filterTerm, setFilterTerm] = useState('');
  const [page, setPage] = useState(1);

  const lang = i18n.language as Lang;

  const { data, isLoading, isFetching } = useGetAllTermsQuery({
    lang,
    term: filterTerm || undefined,
    limit: ITEMS_PER_PAGE,
    page,
  });

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    setFilterTerm(query.trim());
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleNext = () => {
    if (data && page < data.meta.lastPage) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <GlossaryContainer>
      <form className={styles.glossaryHeader} onSubmit={handleFilter}>
        <h3>{t("glossary.title")}</h3>
        <input
          className={styles.input}
          value={query}
          onChange={handleInputChange}
          placeholder={t("glossary.searchPlaceholder") as string}
        />
        <button type="submit">
          <FaFilter />
          {t("glossary.filter")}
        </button>
      </form>

      {isLoading ? (
        <p>{t("loading")}</p>
      ) : (
        <>
          <div className={styles.glossary}>
            {data?.data.map((bgItem) => (
              <BibleGlossaryClientItem key={bgItem.id} bgItem={bgItem} />
            ))}
          </div>

          <div className={styles.pagination}>
            <button onClick={handlePrev} disabled={page <= 1}>
              {t("glossary.prev")}
            </button>
            <span>
              {page} / {data?.meta.lastPage}
            </span>
            <button onClick={handleNext} disabled={page >= (data?.meta.lastPage || 1)}>
              {t("glossary.next")}
            </button>
          </div>
        </>
      )}
    </GlossaryContainer>
  );
};

export default BibleGlossaryClient;
