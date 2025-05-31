"use client";

import BibleGlossaryClientItem from "@/components/Glossary/BibleGlossaryClientItem";
import { useGetAllTermsQuery } from "@/store/apis/glossaryApi";
import styles from "./BibleGlossaryClient.module.css";
import React, { useState } from "react";
import GlossaryContainer from "./GlossaryContainer";
import { useTranslation } from "react-i18next";
import { FaFilter } from "react-icons/fa";
import { Lang } from "@amen24/shared";

const BibleGlossaryClient = () => {
  const { t, i18n } = useTranslation();
  const { data: terms } = useGetAllTermsQuery({ lang: i18n.language as Lang });

  const [query, setQuery] = useState();

  function handleFilter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <GlossaryContainer>
      <form className={styles.glossaryHeader} onSubmit={handleFilter}>
        <h3>{t("glossary.title")}</h3>
        <input className={styles.input} />
        <button type="submit"><FaFilter />{t("glossary.filter")}</button>
      </form>
      <div className={styles.glossary}>
        {terms?.map((bgItem) => (
          <BibleGlossaryClientItem key={bgItem.id} bgItem={bgItem} />
        ))}
      </div>
      <div className={styles.adds}></div>
    </GlossaryContainer>
  );
};

export default BibleGlossaryClient;
