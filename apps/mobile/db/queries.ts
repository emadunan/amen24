export function buildVerseSearchQuery({
  lang,
  query,
}: {
  lang: string;
  query: string;
}) {
  const isArabic = lang === "ar";
  const attribute = isArabic ? "textNormalized" : "text";

  const words = query.trim().split(/\s+/);
  if (words.length === 0) {
    throw new Error("Query is empty");
  }

  const whereConditions = words.map(() => `vt.${attribute} LIKE ?`).join(" AND ");
  const queryParams = words.map((word) => `%${word}%`);
  queryParams.unshift(lang); // for vt.lang = ?

  const sql = `
    SELECT
      vt.id,
      vt.${attribute} as text,
      v.num as verseNum,
      c.num as chapterNum,
      b.bookKey as bookKey,
      b.id as bookId,
      (SELECT COUNT(*) FROM chapter WHERE chapter.bookId = b.id) as bookLen
    FROM verse_translation vt
    JOIN verse v ON vt.verseId = v.id
    JOIN chapter c ON v.chapterId = c.id
    JOIN book b ON c.bookId = b.id
    WHERE vt.lang = ? AND ${whereConditions}
    ORDER BY b.id, c.num, v.num
  `;

  return { sql, params: queryParams };
}
