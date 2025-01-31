import { normalizeArabicText } from "@/utils";
import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

async function main() {
  console.log("START SCRIPT!!");

  const db: Database = await open({
    filename: "../data/bible.db",
    driver: sqlite3.Database,
  });

  console.log("START MAN");

  try {
    const rows = await db.all(`PRAGMA table_info(versesAr)`);

    if (!rows.some((row) => row.name === "textNormalized")) {
      await db.exec(`ALTER TABLE versesAr ADD COLUMN textNormalized TEXT`);
      console.log("column 'textNormalized' added successfully.");
    }

    const allVerses = await db.all<
      { id: number; text: string; textNormalized: string }[]
    >(`SELECT * FROM versesAr`);

    const updateStmt = await db.prepare(
      `UPDATE versesAr SET textNormalized = ? WHERE id = ?`,
    );

    for (const verse of allVerses) {
      const textNormalized = normalizeArabicText(verse.text);

      await updateStmt.run(textNormalized, verse.id);
      console.log("Verse number " + verse.id + " has been normalized");
    }

    await updateStmt.finalize();
    console.log("All verses updated successfully!");
  } catch (err) {
    console.error("Database operation error: ", err);
  } finally {
    await db.close();
  }
}

main();
