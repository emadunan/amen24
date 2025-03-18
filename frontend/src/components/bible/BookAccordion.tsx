import React from "react";
import styles from "./BookAccordion.module.css";
import { BookKey } from "@amen24/shared";
import { useTranslation } from "react-i18next";

interface AccordionProps {
  bookKey: BookKey;
  openBook: BookKey | null;
  onOpenBook: (bookKey: BookKey) => void;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ children, bookKey, openBook, onOpenBook }) => {
  const { t } = useTranslation("book");
  const isOpen = openBook === bookKey;
  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={onOpenBook.bind(this, bookKey)}
      >
        {t(bookKey)}
        <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>▼</span>
      </button>
      <div
        className={`${styles.accordionContent} ${isOpen ? styles.show : ""}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
