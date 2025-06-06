"use client";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Lang } from "@amen24/shared";
import { useGetAllTermsQuery } from "@/store/apis/glossaryApi";

import BibleGlossaryClientItem from "@/components/Glossary/BibleGlossaryClientItem";
import GlossaryContainer from "./GlossaryContainer";
import styles from "./BibleGlossaryClient.module.css";
import { GlossaryFilterForm, Pagination } from "@amen24/ui";

const ITEMS_PER_PAGE = 10;

const BibleGlossaryClient = () => {
  const { t, i18n } = useTranslation();
  const [query, setQuery] = useState("");
  const [filterTerm, setFilterTerm] = useState("");
  const [page, setPage] = useState(1);

  const lang = i18n.language as Lang;

  const { data, isLoading } = useGetAllTermsQuery({
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

  const handlePageChange = (newPage: number) => {
    if (data && newPage >= 1 && newPage <= data.meta.lastPage) {
      setPage(newPage);
    }
  };

  const handleReset = () => {
    setPage(1);
    setQuery('');
    setFilterTerm('');
  }

  return (
    <GlossaryContainer>
      <div className={styles.glossaryHeader}>
        <h3 className={styles.glossaryTitle}>{t("glossary.title")}</h3>
        <GlossaryFilterForm
          t={t}
          query={query}
          onQueryChange={handleInputChange}
          onSubmit={handleFilter}
          onReset={handleReset}
        />
      </div>

      {isLoading ? (
        <p>{t("loading")}</p>
      ) : (
        <>
          <div className={styles.glossary}>
            {data?.data.map((bgItem) => (
              <BibleGlossaryClientItem key={bgItem.id} bgItem={bgItem} />
            ))}
          </div>

          {data && (
            <Pagination
              t={t}
              lang={lang}
              page={page}
              lastPage={data?.meta.lastPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </GlossaryContainer>
  );
};

export default BibleGlossaryClient;
