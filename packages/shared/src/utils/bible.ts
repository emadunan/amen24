import { BookKey, Lang } from "../enums";

export const isOldTestament = (bookKey: string): boolean => {
  const oldTestamentBooks = [
    "GEN",
    "EXO",
    "LEV",
    "NUM",
    "DEU",
    "JOS",
    "JDG",
    "RUT",
    "1SA",
    "2SA",
    "1KI",
    "2KI",
    "1CH",
    "2CH",
    "EZR",
    "NEH",
    "EST",
    "JOB",
    "PSA",
    "PRO",
    "ECC",
    "SNG",
    "ISA",
    "JER",
    "LAM",
    "EZK",
    "DAN",
    "HOS",
    "JOL",
    "AMO",
    "OBA",
    "JON",
    "MIC",
    "NAM",
    "HAB",
    "ZEP",
    "HAG",
    "ZEC",
    "MAL",
  ];
  return oldTestamentBooks.includes(bookKey);
};

export function resolveRenderLang(lang: Lang, bookKey: BookKey) {
  return lang === Lang.NATIVE
    ? isOldTestament(bookKey)
      ? Lang.HEBREW
      : Lang.GREEK
    : lang;
}