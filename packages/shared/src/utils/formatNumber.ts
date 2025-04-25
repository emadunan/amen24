import { Lang } from "../enums";

const LOCALE_MAP: Partial<Record<Lang, string>> = {
  [Lang.ENGLISH]: "en-US",
  [Lang.ARABIC]: "ar-EG",
  [Lang.FRENCH]: "fr-FR",
  [Lang.RUSSIAN]: "ru-RU",
};

// Hebrew letters for numerals
const HEBREW_NUMERALS: [number, string][] = [
  [400, 'ת'],
  [300, 'ש'],
  [200, 'ר'],
  [100, 'ק'],
  [90, 'צ'],
  [80, 'פ'],
  [70, 'ע'],
  [60, 'ס'],
  [50, 'נ'],
  [40, 'מ'],
  [30, 'ל'],
  [20, 'כ'],
  [10, 'י'],
  [9, 'ט'],
  [8, 'ח'],
  [7, 'ז'],
  [6, 'ו'],
  [5, 'ה'],
  [4, 'ד'],
  [3, 'ג'],
  [2, 'ב'],
  [1, 'א'],
];

// Greek letters for numerals
const GREEK_NUMERALS: [number, string][] = [
  [900, 'ϡ'],
  [800, 'ω'],
  [700, 'ψ'],
  [600, 'χ'],
  [500, 'φ'],
  [400, 'υ'],
  [300, 'τ'],
  [200, 'σ'],
  [100, 'ρ'],
  [90, 'ϟ'],
  [80, 'π'],
  [70, 'ο'],
  [60, 'ξ'],
  [50, 'ν'],
  [40, 'μ'],
  [30, 'λ'],
  [20, 'κ'],
  [10, 'ι'],
  [9, 'θ'],
  [8, 'η'],
  [7, 'ζ'],
  [6, 'ϝ'], // digamma
  [5, 'ε'],
  [4, 'δ'],
  [3, 'γ'],
  [2, 'β'],
  [1, 'α'],
];

function toHebrewNumeral(num: number): string {
  let result = '';
  for (const [value, letter] of HEBREW_NUMERALS) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result;
}

function toGreekNumeral(num: number): string {
  let result = '';
  for (const [value, letter] of GREEK_NUMERALS) {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  }
  return result + 'ʹ'; // the keraia mark for Greek numerals
}

export function formatNumber(num: number, lang: Lang): string {
  if (lang === Lang.HEBREW) return toHebrewNumeral(num);
  if (lang === Lang.GREEK) return toGreekNumeral(num);

  const locale = LOCALE_MAP[lang] || "en-US";
  return num.toLocaleString(locale, { useGrouping: false });
}
