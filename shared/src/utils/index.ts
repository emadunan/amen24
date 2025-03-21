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

export * from "./formatNumber";
export * from "./textNormalization"
