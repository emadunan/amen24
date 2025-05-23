import { Lang } from "@amen24/shared";

export function getDirection(lang: Lang): "rtl" | "ltr" {
  const rtlLangs = [Lang.ARABIC, Lang.HEBREW];
  return rtlLangs.includes(lang) ? "rtl" : "ltr";
}

export const isRtl = (lang: Lang): boolean => {
  return [Lang.ARABIC, Lang.HEBREW].includes(lang);
};