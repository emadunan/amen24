import React, { useState } from "react";
import styles from "./BookAccordion.module.css";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordion}>
      <button
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
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
