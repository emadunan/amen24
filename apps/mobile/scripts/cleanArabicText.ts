import { normalizeArabicText } from "../utils";
import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

async function normalizeTextAttribute(table: string) {
  console.log(`Working on ${table} table ...`);

  const db: Database = await open({
    filename: "../data/bible.db",
    driver: sqlite3.Database,
  });

  try {
    const allVerses = await db.all<
      { id: number; text: string; textNormalized: string }[]
    >(`SELECT * FROM ${table}`);

    const updateStmt = await db.prepare(
      `UPDATE ${table} SET textNormalized = ? WHERE id = ?`,
    );

    for (const verse of allVerses) {
      if (table === "versesAr") {
        const textNormalized = normalizeArabicText(verse.text);
        await updateStmt.run(textNormalized, verse.id);
        console.log("Verse number " + verse.id + " has been normalized");
      } else if (table === "versesEn") {
        await updateStmt.run(verse.text, verse.id);
        console.log("Verse number " + verse.id + " has been normalized");
      }
    }

    await updateStmt.finalize();
    console.log("All verses updated successfully!");
  } catch (err) {
    console.error("Database operation error: ", err);
  } finally {
    await db.close();
  }
}
(async () => {
  await normalizeTextAttribute("versesAr");
  // await normalizeTextAttribute("versesEn");
})();
