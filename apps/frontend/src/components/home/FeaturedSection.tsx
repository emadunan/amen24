"use client"

import React from 'react';
import { useGetAllFeaturedQuery } from '@/store/apis/featuredApi'
import { FeaturedPosition, Lang } from '@amen24/shared'
import { useTranslation } from 'react-i18next';
import styles from './FeaturedSection.module.css';
import FeaturedParagraph from './FeaturedParagraph';

const FeaturedSection = () => {
  const { i18n } = useTranslation();

  const { data: featured1 } = useGetAllFeaturedQuery({ lang: i18n.language as Lang, position: FeaturedPosition.HOMEPAGE_FEATURED_1 });
  const { data: featured2 } = useGetAllFeaturedQuery({ lang: i18n.language as Lang, position: FeaturedPosition.HOMEPAGE_FEATURED_2 });
  const { data: featured3 } = useGetAllFeaturedQuery({ lang: i18n.language as Lang, position: FeaturedPosition.HOMEPAGE_FEATURED_3 });

  return (
    <section className={styles.featuredContainer}>
      <FeaturedParagraph featured={featured1?.at(0)} lang={i18n.language as Lang} />
      <FeaturedParagraph featured={featured2?.at(0)} lang={i18n.language as Lang} />
      <FeaturedParagraph featured={featured3?.at(0)} lang={i18n.language as Lang} />
    </section>
  )
}

export default FeaturedSection