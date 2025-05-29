"use client"

import React from 'react';
import { useGetOneTermQuery } from '@/store/apis/glossaryApi';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import styles from './BibleGlossaryDetails.module.css'
import OnesideAddsContainer from './OnesideAddsContainer';

const BibleGlossaryDetails: React.FC = () => {
  const params = useParams<{ slug: string }>();
  const slug = params.slug;

  const { i18n } = useTranslation();
  const { data: glossaryItem } = useGetOneTermQuery(slug);

  const term = glossaryItem?.translations.find(t => t.lang === i18n.language);

  return (
    <OnesideAddsContainer>
      <div className={styles.term}>
        <h3>{term?.term} [{glossaryItem?.native}]</h3>
        <p>{term?.definition}</p>
      </div>
      <div className={styles.adds}></div>
    </OnesideAddsContainer>
  )
}

export default BibleGlossaryDetails