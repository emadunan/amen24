import styles from "./GlossaryTermItem.module.css";
import { BibleGlossary } from '@amen24/shared';
import { NavLink } from "react-router-dom";
import React from 'react';

interface Props {
  item: BibleGlossary;
}

const GlossaryTermItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.item}>
      <h4>/ {item.slug.toUpperCase()}</h4>
      {/* <p className={styles.verseCount}>{item.verses.length}</p> */}
      {/* <p>{item.translations.filter(t => t.lang === Lang.ENGLISH)[0].description}</p> */}
      <NavLink to={`${item.slug}`} className={styles.openBtn}>Open</NavLink>
    </div>
  )
}

export default GlossaryTermItem