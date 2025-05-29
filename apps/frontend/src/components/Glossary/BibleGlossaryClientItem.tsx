import { ApprovalStatus, BibleGlossary } from "@amen24/shared";
import Link from "next/link";
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./BibleGlossaryClientItem.module.css";

interface Props {
  bgItem: BibleGlossary;
}

const BibleGlossaryClientItem: React.FC<Props> = ({ bgItem }) => {
  const { i18n } = useTranslation();
  const bgt = bgItem.translations.find((bgt) => bgt.lang === i18n.language);

  return (
    <div className={styles.container}>
      <article className={styles.term}>
        <Link href={`/glossary/${bgItem.slug}`} className={styles.link}>
          <h3 className={styles.linkText}>
            {bgt?.term} [{bgItem.native}]
          </h3>
        </Link>
        <p>
          {bgItem.approvalStatus === ApprovalStatus.Approved
            ? bgt?.definition
            : (bgt?.oldDefinition ?? "")}
        </p>
      </article>
    </div>
  );
};

export default BibleGlossaryClientItem;
