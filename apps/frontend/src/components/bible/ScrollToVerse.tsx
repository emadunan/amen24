"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

const ScrollToVerse = () => {
  const searchParams = useSearchParams();
  const verseId = searchParams.get("v");

  useEffect(() => {
    if (!verseId) return;
    const target = document.getElementById(`v-${verseId}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [verseId]);

  return null;
};

export default ScrollToVerse;
