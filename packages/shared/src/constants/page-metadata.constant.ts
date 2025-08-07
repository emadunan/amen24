type SearchPageMetadata = {
  [lang: string]: {
    title: string;
    description: string;
  };
};

export const searchPageMetadata: SearchPageMetadata = {
  en: {
    title: "Advanced Bible Search | Explore Scripture by Keywords",
    description:
      "Use our advanced Bible search engine to explore the Word of God. Quickly find verses, keywords, and chapters in the Bible with full language support.",
  },
  ar: {
    title: "بحث متقدم في الكتاب المقدس | استكشف الكلمة بسهولة",
    description:
      "استخدم محرك البحث المتقدم لاستكشاف كلمة الله. اعثر بسرعة على الآيات والكلمات والمقاطع في الكتاب المقدس بدقة وسهولة وبدعم لغوي كامل.",
  },
};
