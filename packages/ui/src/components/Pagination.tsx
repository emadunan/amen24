import React from "react";
import styles from "./Pagination.module.css";
import { formatNumber, Lang } from "@amen24/shared";
import { TFunction } from "i18next";

interface Props {
  t: TFunction;
  lang: Lang;
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<Props> = ({
  t,
  lang,
  page,
  lastPage,
  onPageChange,
}) => {
  // Generate the page numbers to show with ellipsis for large sets
  const getPageNumbers = () => {
    const delta = 2;
    const range: (number | string)[] = [];
    const rangeWithDots: (number | string)[] = [];

    for (let i = 1; i <= lastPage; i++) {
      if (
        i === 1 ||
        i === lastPage ||
        (i >= page - delta && i <= page + delta)
      ) {
        range.push(i);
      }
    }

    let lastPageAdded = 0;
    for (const p of range) {
      if (typeof p === "number") {
        if (p - lastPageAdded > 1) {
          rangeWithDots.push("...");
        }
        rangeWithDots.push(p);
        lastPageAdded = p;
      }
    }

    return rangeWithDots;
  };

  return (
    <nav
      className={styles.paginationContainer}
      aria-label="Pagination Navigation"
    >
      <button
        className={styles.pageButton}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label={t("main.prev")}
      >
        {t("main.prev")}
      </button>

      {getPageNumbers().map((p, i) =>
        p === "..." ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            {p}
          </span>
        ) : (
          <button
            key={p}
            className={`${styles.pageButton} ${
              p === page ? styles.activePage : ""
            }`}
            onClick={() => onPageChange(Number(p))}
            aria-current={p === page ? "page" : undefined}
          >
            {formatNumber(parseInt(p.toString()), lang)}
          </button>
        ),
      )}

      <button
        className={styles.pageButton}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= lastPage}
        aria-label={t("main.next")}
      >
        {t("main.next")}
      </button>
    </nav>
  );
};
