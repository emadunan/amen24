import React, { createContext, useContext, useState, ReactNode } from "react";
import { Verse, BookKey, BookMap, Lang, formatNumber } from "@amen24/shared";
import { TFunction } from "i18next";

interface HighlightContextProps {
  highlighted: number[];
  toggleHighlight: (verseNum: number) => void;
  clearHighlighted: () => void;
  copyHighlighted: (verses: Verse[], chapterNum: number, bookKey: BookKey) => void;
}

const HighlightContext = createContext<HighlightContextProps | undefined>(undefined);

interface HighlightProviderProps {
  children: ReactNode;
  language: string;
  t: TFunction;
  copyToClipboard?: (text: string) => Promise<void>;
}

export const HighlightProvider: React.FC<HighlightProviderProps> = ({ children, t, language, copyToClipboard }) => {
  const [highlighted, setHighlighted] = useState<number[]>([]);

  const toggleHighlight = (verseNum: number) => {
    setHighlighted((prev: number[]) =>
      prev.includes(verseNum) ? prev.filter((v) => v !== verseNum) : [...prev, verseNum]
    );
  };

  const clearHighlighted = () => {
    setHighlighted([]);
  };

  const copyHighlighted = (verses: Verse[], chapterNum: number, bookKey: BookKey) => {
    const selected = verses
      .filter((v) => highlighted.includes(v.id))
      .sort((a, b) => a.id - b.id);

    if (selected.length === 0) return;

    const chapterStr = formatNumber(chapterNum, language as Lang);
    const firstVerseNum = formatNumber(selected[0].num, language as Lang);
    const lastVerseNum = formatNumber(selected[selected.length - 1].num, language as Lang);
    const bookName = t(`book:${bookKey}`);

    // Build verse text with ".." for gaps
    let previousNum: number | null = null;
    const verseText = selected
      .map((v) => {
        const isGap = previousNum !== null && v.num !== previousNum + 1;
        previousNum = v.num;
        return `${isGap ? " .. " : " "}${v.verseTranslations[0].text}`;
      })
      .join("")
      .trim();

    const verseRef = `(${bookName} ${chapterStr} : ${firstVerseNum}${firstVerseNum !== lastVerseNum ? ` - ${lastVerseNum}` : ""})`;

    const baseUrl = `https://amen24.org/${language}`;
    const passageUrl = `${baseUrl}/${bookKey}/${chapterNum}/${BookMap[bookKey].len}?v=${highlighted.join(",")}`;

    const formattedText = `${verseText}\n${verseRef}\n\n${t("main.readMore")}: ${passageUrl}`;

    // Check mobile copyToClipboard and fallback to web
    const safeCopy = copyToClipboard || ((text: string) =>
      typeof navigator !== "undefined" && navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(text)
        : Promise.resolve(console.log("Copy fallback:", text))
    );

    safeCopy(formattedText)
      .then(() => console.log(`${verseRef} ${t("toolbox.copiedToClipboard")}`))
      .catch((err: any) => console.error("Copy failed:", err));
  };

  return (
    <HighlightContext.Provider
      value={{ highlighted, toggleHighlight, clearHighlighted, copyHighlighted }}
    >
      {children}
    </HighlightContext.Provider>
  );
};

export const useHighlightContext = (): HighlightContextProps => {
  const context = useContext(HighlightContext);
  if (!context) {
    throw new Error("useHighlightContext must be used within a HighlightProvider");
  }
  return context;
};
