"use client";

import BibleGlossaryClientItem from "@/components/Glossary/BibleGlossaryClientItem";
import { useGetAllTermsQuery } from "@/store/apis/glossaryApi";
import styles from "./BibleGlossaryClient.module.css";
import React from 'react';

const BibleGlossaryClient = () => {
  const { data: terms } = useGetAllTermsQuery();

  return (
    <div className={styles.container}>
      <div className={styles.glossary}>{terms?.map((bgItem) => (
        <BibleGlossaryClientItem key={bgItem.id} bgItem={bgItem} />
      ))}
      </div>
      <div className={styles.adds}></div>
    </div>
  )
}

export default BibleGlossaryClient;