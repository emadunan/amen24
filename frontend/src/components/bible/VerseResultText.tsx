import React, { FC } from "react";
import styles from "./VerseResultText.module.css";

type Props = {
  text: string;
  queryTerms: string[];
};

// Your Arabic normalization
const normalizeArText = (text: string): string => {
  const map: Record<string, string> = {
    "آ": "ا", "أ": "ا", "إ": "ا", "ٱ": "ا",
    "ة": "ه", "ى": "ي", "ؤ": "و", "ئ": "ي",
    "٠": "0", "١": "1", "٢": "2", "٣": "3",
    "٤": "4", "٥": "5", "٦": "6", "٧": "7",
    "٨": "8", "٩": "9"
  };
  return text.replace(/[آأإٱةىؤئ٠-٩]/g, char => map[char] || char);
};

const VerseResultText: FC<Props> = ({ text, queryTerms }) => {
  if (!queryTerms.length) return <p className={styles.text}>{text}</p>;

  const normalizedText = normalizeArText(text);

  const escapedTerms = queryTerms
    .filter(Boolean)
    .map(term =>
      normalizeArText(term).replace(/[-[\]/{}()*+?.\\^$|]/g, "\\$&")
    );

  const pattern = new RegExp(`(${escapedTerms.join("|")})`, "gi");

  // Find matches in normalized text and map back to original text
  let highlighted = "";
  let lastIndex = 0;

  normalizedText.replace(pattern, (match, _g1, offset) => {
    const originalPart = text.slice(lastIndex, offset);
    const matchedPart = text.slice(offset, offset + match.length);
    highlighted += originalPart;
    highlighted += `<span class="${styles.highlight}">${matchedPart}</span>`;
    lastIndex = offset + match.length;
    return match;
  });

  highlighted += text.slice(lastIndex); // Add any remaining text

  return (
    <p
      className={styles.text}
      dir="auto"
      dangerouslySetInnerHTML={{ __html: highlighted }}
    />
  );
};

export default VerseResultText;
