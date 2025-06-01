import { Lang } from "../enums";
import { Verse } from "../interfaces";

export function normalizeText(text: string, lang: Lang): string {
  if (!text) return '';

  switch (lang) {
    case Lang.ARABIC:
      return normalizeArText(removeArDiacritics(text)).normalize("NFC");

    case Lang.HEBREW:
      return removeHebrewDiacritics(text).normalize("NFC");

    case Lang.GREEK:
      return removeGreekDiacritics(text).normalize("NFC");

    case Lang.ENGLISH:
    case Lang.RUSSIAN:
    default:
      return text.trim().normalize("NFC");
  }
}


export function removeNaDiacritics(text: string): string {
  // Normalize text to decompose combined characters into base + diacritics
  // Then remove the diacritics with a regex that covers common Unicode combining marks for Hebrew and Greek

  // Unicode ranges for combining marks relevant to Hebrew and Greek:
  // Hebrew: U+0591 to U+05BD, U+05BF, U+05C1 to U+05C2, U+05C4, U+05C5, U+05C7
  // Greek: Mainly in the combining diacritical marks range U+0300 to U+036F

  return text
    .normalize('NFD')
    // Remove Hebrew combining marks
    .replace(/[\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/g, '')
    // Remove Greek combining marks
    .replace(/[\u0300-\u036f]/g, '');
}

export function removeHebrewDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7]/g, '');
}

export function removeGreekDiacritics(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const DIACRITICS_REGEX = /[\u064B-\u065F\u0670]/g; // Arabic diacritics range

export function removeArDiacritics(text: string): string {
  return text.replace(DIACRITICS_REGEX, "");
}

export function replaceWaslaAlef(text: string): string {
  return text.replace(/ٱ/g, "ا"); // Replace "ٱ" (Wasla) with "ا" (Alef)
}

export function normalizeArText(text: string): string {
  if (!text) return ""; // Handle empty input safely

  const normalizationMap: Record<string, string> = {
    "آ": "ا", "أ": "ا", "إ": "ا", "ٱ": "ا", // Variants of Alef → Alef
    "ة": "ه", "ى": "ي", "ؤ": "و", "ئ": "ي", // Teh Marbuta, Alef Maksura, Waw & Yeh with Hamza → normalized
    "٠": "0", "١": "1", "٢": "2", "٣": "3", // Arabic digits → Western digits
    "٤": "4", "٥": "5", "٦": "6", "٧": "7",
    "٨": "8", "٩": "9"
  };

  return text.replace(/[آأإٱةىؤئ٠-٩]/g, (char) => normalizationMap[char]);
}

export function detectLanguage(text: string): Lang {
  if (/[\u0600-\u06FF]/.test(text)) return Lang.ARABIC; // Arabic
  if (/[\u0590-\u05FF]/.test(text)) return Lang.HEBREW; // Hebrew
  if (/[\u0370-\u03FF]/.test(text)) return Lang.GREEK; // Greek
  if (/[\u0400-\u04FF]/.test(text)) return Lang.RUSSIAN; // Russian (Cyrillic)
  if (/[\u0041-\u005A\u0061-\u007A]/.test(text)) return Lang.ENGLISH; // English/French (Latin)

  return Lang.ENGLISH; // Default fallback
}

export function buildJoinedText(verses: Verse[], lang: Lang): string {
  return verses
    .map((verse, idx, arr) => {
      const translation = verse.verseTranslations.find(
        (t) => t.lang === lang,
      )?.textDiacritized;

      if (!translation) return '';

      if (idx === 0) return translation;

      const prevVerseNum = arr[idx - 1].num;
      const isSequential = verse.num === prevVerseNum + 1;

      return (isSequential ? ' ' : ' .. ') + translation;
    })
    .join('');
}

export function sanitizeWord(input: string): string {
  return input
    .trim()                               // Remove leading/trailing whitespace
    .replace(/["'“”‘’«»]/g, "")           // Remove all quotation marks including Arabic-style «»
    .replace(/[()[\]{}<>]/g, "")          // Remove all types of brackets
    .replace(/[^\p{L}\-–—\u05BE]/gu, "")  // Remove everything except Unicode letters and dashes
    .normalize("NFC");                    // Normalize composed characters
}