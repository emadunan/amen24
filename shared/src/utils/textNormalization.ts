const DIACRITICS_REGEX = /[\u064B-\u065F\u0670]/g;

// Normalization mapping
const NORMALIZATION_MAP: Record<string, string> = {
  "آ": "ا", // Alef with Madda → Alef
  "أ": "ا", // Alef with Hamza Above → Alef
  "إ": "ا", // Alef with Hamza Below → Alef
  "ٱ": "ا", // Alef Wasla → Alef
  "ة": "ه", // Teh Marbuta → Heh
  "ى": "ي", // Alef Maksura → Yeh
  "ؤ": "و", // Waw with Hamza → Waw
  "ئ": "ي", // Yeh with Hamza → Yeh
};

/**
 * Removes Arabic diacritics (Harakat) from text.
 * @param text - The input Arabic text.
 * @returns The text without diacritics.
 */
export function removeArDiacritics(text: string): string {
  return String(text).replace(DIACRITICS_REGEX, ""); // Ensure input is string & remove diacritics
}

/**
 * Normalizes Arabic text for better search indexing.
 * @param text - The input Arabic text.
 * @returns The normalized text.
 */
export function normalizeArText(text: string): string {
  text = removeArDiacritics(text); // First, remove diacritics
  return text.replace(/[آأإٱةىؤئ]/g, (match) =>
    Object.prototype.hasOwnProperty.call(NORMALIZATION_MAP, match) ? NORMALIZATION_MAP[match] : match
  );
}