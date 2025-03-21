const DIACRITICS_REGEX = /[\u064B-\u065F\u0670]/g;

export function removeArDiacritics(text: string): string {
  return String(text).replace(DIACRITICS_REGEX, ""); // Ensure input is string & remove diacritics
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