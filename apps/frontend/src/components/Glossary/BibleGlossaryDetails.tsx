"use client";

import React from "react";
import { useGetOneTermQuery } from "@/store/apis/glossaryApi";
import { useTranslation } from "react-i18next";
import { useParams } from "next/navigation";
import styles from "./BibleGlossaryDetails.module.css";
import GlossaryContainer from "./GlossaryContainer";
import ReactMarkdown from 'react-markdown';

const BibleGlossaryDetails: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { i18n } = useTranslation();
  const { data: glossaryItem } = useGetOneTermQuery(slug);

  const term = glossaryItem?.translations.find((t) => t.lang === i18n.language);

  return (
    <GlossaryContainer>
      <div className={styles.term}>
        <h3>
          {term?.term} [{glossaryItem?.native}]
        </h3>
        <div>
          <ReactMarkdown>{term?.definition || ''}</ReactMarkdown>
        </div>
      </div>
      <div className={styles.adds}></div>
    </GlossaryContainer>
  );
};

export default BibleGlossaryDetails;
