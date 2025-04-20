"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeArabicText = void 0;
exports.convertToSuperscript = convertToSuperscript;
function convertToSuperscript(num) {
  var superscripts = {
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };
  return num
    .toString()
    .split("")
    .map(function (digit) {
      return superscripts[digit] || digit;
    })
    .join("");
}
var normalizeArabicText = function (text) {
  // Remove Arabic diacritics
  var diacriticsRegex = /[\u064B-\u065F]/g;
  text = text.replace(diacriticsRegex, "");
  // Normalize specific Arabic characters
  var normalizationMap = {
    آ: "ا", // Alef with Madda → Alef
    أ: "ا", // Alef with Hamza Above → Alef
    إ: "ا", // Alef with Hamza Below → Alef
    ٱ: "ا", // Alef Wasla → Alef (Missed in original)
    ة: "ه", // Teh Marbuta → Heh
    ى: "ي", // Alef Maksura → Yeh
    // ؤ: "و", // Waw with Hamza → Waw (removed)
    // ئ: "ي", // Yeh with Hamza → Yeh (removed)
    ٮ: "ب", // Old Arabic Ba → Ba
    ٯ: "ف", // Old Arabic Fa → Fa
    ڤ: "ف", // Persian V → Fa (used in some Arabic dialects)
    پ: "ب", // Persian Peh → Ba
    چ: "ج", // Persian Cheh → Jeem
    گ: "ك", // Persian Gaf → Kaf
    "٠": "0",
    "١": "1",
    "٢": "2",
    "٣": "3",
    "٤": "4",
    "٥": "5",
    "٦": "6",
    "٧": "7",
    "٨": "8",
    "٩": "9", // Arabic digits → Standard digits
  };
  text = text.replace(/[آأإٱةىٮٯڤپچگ٠-٩]/g, function (char) {
    return normalizationMap[char];
  });
  return text;
};
exports.normalizeArabicText = normalizeArabicText;
