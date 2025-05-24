import styles from "./GlossaryTermItem.module.css";
import { BibleGlossary } from '@amen24/shared';
import { NavLink } from "react-router-dom";
import React from 'react';
import { ApprovalIcon } from "@amen24/ui";

interface Props {
  item: BibleGlossary;
}

const GlossaryTermItem: React.FC<Props> = ({ item }) => {
  return (
    <div className={styles.item}>
      <h4>/ {item.slug.toUpperCase()}</h4>

      <p>[{item.native}]</p>
      <p> &mdash; {item.category}</p>
      <ApprovalIcon status={item.approvalStatus} />


      <div className={styles.actions}>
        <NavLink to={`${item.slug}`} className={styles.openBtn}>Open</NavLink>
      </div>
    </div>
  )
}

export default GlossaryTermItem