export function buildVerseSearchQuery({
  lang,
  query,
  selectedBooks,
}: {
  lang: string;
  query: string;
  selectedBooks: string[];
}) {
  const words = query.trim().split(/\s+/);
  if (!words.length) {
    throw new Error("Query is empty");
  }

  const likeConditions = words
    .map(() => `vt.textNormalized LIKE ?`)
    .join(" AND ");
  const queryParams = words.map((word) => `%${word}%`);

  // Prepare bookKey placeholders
  const bookPlaceholders = selectedBooks.map(() => `?`).join(", ");

  const sql = `
    SELECT
      vt.id,
      vt.text,
      v.num,
      c.num AS chapterNum,
      b.bookKey AS bookKey,
      b.id AS bookId,
      (SELECT COUNT(*) FROM chapter WHERE chapter.bookId = b.id) AS bookLen
    FROM verse_translation vt
    JOIN verse v ON vt.verseId = v.id
    JOIN chapter c ON v.chapterId = c.id
    JOIN book b ON c.bookId = b.id
    WHERE vt.lang = ?
      AND b.bookKey IN (${bookPlaceholders})
      AND ${likeConditions}
    ORDER BY b.id, c.num, v.num
  `;

  return {
    sql,
    params: [lang, ...selectedBooks, ...queryParams],
  };
}
