import React, { ChangeEvent, FormEvent } from "react";
import styles from "./GlossaryFilterForm.module.css";
import { FaFilter } from "react-icons/fa";
import { TFunction } from "i18next";

interface Props {
  query: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  t: TFunction;
}

export const GlossaryFilterForm: React.FC<Props> = ({
  t,
  query,
  onSubmit,
  onInputChange,
}) => {
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <input
        className={styles.input}
        value={query}
        onChange={onInputChange}
        placeholder={t("common:glossary.filterPlaceholder")}
      />
      <button className={styles.button} type="submit">
        <FaFilter />
        {t("glossary.filter")}
      </button>
    </form>
  );
};
