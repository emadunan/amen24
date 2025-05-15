"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ScrollToVerse = () => {
  const searchParams = useSearchParams();
  const verseParam = searchParams.get("v");

  useEffect(() => {
    if (!verseParam) return;

    const firstVerseId = verseParam.split(",")[0];
    const target = document.getElementById(`v-${firstVerseId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [verseParam]);

  return null;
};

export default ScrollToVerse;
