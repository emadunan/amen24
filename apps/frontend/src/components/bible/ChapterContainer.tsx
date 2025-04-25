"use client"

import React, { FC, ReactNode } from 'react';
import styles from './ChapterContainer.module.css'
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface Props {
  children: ReactNode;
}

const ChapterContainer: FC<Props> = ({ children }) => {
  const lang = useSelector((state: RootState) => state.translation.lang);

  return (
    <div className={`${styles.chapterContainer} ${!lang ? styles.oneLang : ''}`}>{children}</div>
  )
}

export default ChapterContainer