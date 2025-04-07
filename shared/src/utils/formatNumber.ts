import { Lang } from "../enums";

const LOCALE_MAP: Partial<Record<Lang, string>> = {
  [Lang.ENGLISH]: "en-US",
  [Lang.ARABIC]: "ar-EG",
  [Lang.FRENCH]: "fr-FR",
  [Lang.GREEK]: "el-GR",
  [Lang.RUSSIAN]: "ru-RU",
  [Lang.HEBREW]: "he-IL",
};

export function formatNumber(num: number, lang: Lang): string {
  const locale = LOCALE_MAP[lang] || "en-US"; // Default to English if lang is unknown
  return num.toLocaleString(locale, { useGrouping: false });
}
