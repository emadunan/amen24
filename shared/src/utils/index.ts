import { Lang } from "../@types";

export function convertToSuperscript(num: number): string {
  const superscripts: Record<string, string> = {
    "0": "⁰",
    "1": "¹",
    "2": "²",
    "3": "³",
    "4": "⁴",
    "5": "⁵",
    "6": "⁶",
    "7": "⁷",
    "8": "⁸",
    "9": "⁹",
  };

  return num
    .toString()
    .split("")
    .map((digit) => superscripts[digit] || digit)
    .join("");
}

export function detectLanguage(text: string): Lang {
  // Trim spaces and get the first meaningful character
  const firstChar = text.trim().replace(/^[^a-zA-Z\u0600-\u06FF]+/, "")[0];

  if (!firstChar) return Lang.ENGLISH; // Default fallback

  return firstChar.charCodeAt(0) >= 0x0600 && firstChar.charCodeAt(0) <= 0x06ff
    ? Lang.ARABIC
    : Lang.ENGLISH;
}

export * from "./formatNumber";
export * from "./textNormalization"
