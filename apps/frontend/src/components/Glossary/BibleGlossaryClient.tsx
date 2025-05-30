"use client";

import BibleGlossaryClientItem from "@/components/Glossary/BibleGlossaryClientItem";
import { useGetAllTermsQuery } from "@/store/apis/glossaryApi";
import styles from "./BibleGlossaryClient.module.css";
import React from "react";
import GlossaryContainer from "./GlossaryContainer";

const BibleGlossaryClient = () => {
  const { data: terms } = useGetAllTermsQuery();

  return (
    <GlossaryContainer>
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
