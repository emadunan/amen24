import React, { FC } from "react";
import styles from "./VerseResultText.module.css";

type Props = {
  text: string;
  queryTerms: string[];
};

const VerseResultText: FC<Props> = ({ text, queryTerms }) => {  
  if (!queryTerms.length) return <p className={styles.text}>{text}</p>;

  const escapedTerms = queryTerms
    .filter(Boolean)
    .map(term => term.replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&"));

  const pattern = new RegExp(`(${escapedTerms.join("|")})`, "gi");

  return (
    <p
      className={styles.text}
      dir="auto"
      dangerouslySetInnerHTML={{
        __html: text.replace(
          pattern,
          (match) => `<span class="${styles.highlight}">${match}</span>`
        ),
      }}
    />
  );
}

export default VerseResultText;
