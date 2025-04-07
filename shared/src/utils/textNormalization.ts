import { Lang } from "../enums";

const DIACRITICS_REGEX = /[\u064B-\u065F\u0670]/g; // Arabic diacritics range

export function removeArDiacritics(text: string): string {
  return text.replace(DIACRITICS_REGEX, ""); // Remove harakat
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