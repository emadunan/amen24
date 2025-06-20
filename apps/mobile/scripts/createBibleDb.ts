import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";
import { readFile } from "fs/promises";
import { existsSync, unlinkSync } from "fs";
import { BookKey, BookMap, Lang, removeArDiacritics, normalizeArText, replaceWaslaAlef, removeNaDiacritics } from "@amen24/shared";

const dbPath = "../data/bible.db";
if (existsSync(dbPath)) {
  unlinkSync(dbPath);
  console.log("🧹 Old bible.db deleted.");
}

async function initDatabase() {
  const db: Database = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bookKey TEXT NOT NULL UNIQUE,
        slug TEXT
      );

      CREATE TABLE IF NOT EXISTS chapter (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num INTEGER NOT NULL,
        bookId INTEGER NOT NULL,
        FOREIGN KEY (bookId) REFERENCES book(id) ON DELETE CASCADE,
        UNIQUE (bookId, num)
      );

      CREATE TABLE IF NOT EXISTS verse (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num SMALLINT NOT NULL,
        chapterId INTEGER NOT NULL,
        FOREIGN KEY (chapterId) REFERENCES chapter(id) ON DELETE CASCADE,
        UNIQUE (chapterId, num)
      );

      CREATE TABLE IF NOT EXISTS verse_translation (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        verseId INTEGER NOT NULL,
        lang TEXT NOT NULL,
        text TEXT,
        textNormalized TEXT,
        textDiacritized TEXT,
        FOREIGN KEY (verseId) REFERENCES verse(id) ON DELETE CASCADE,
        UNIQUE (verseId, lang)
      );
    `);

    console.log("✅ All tables created following backend schema.");
  } catch (error) {
    console.error("❌ Error creating tables:", error);
    throw new Error("Database schema creation failed!");
  }

  for (const key in BookMap) {
    const book = BookMap[key as BookKey];
    const { slug } = book;
    const response = await db.run(`INSERT INTO book (bookKey, slug) VALUES (?, ?)`, [key, slug]);
    const bookId = response.lastID;

    for (let chapterNum = 1; chapterNum <= book.len; chapterNum++) {
      await db.run(`INSERT INTO chapter (num, bookId) VALUES (?, ?)`, [chapterNum, bookId]);
    }
  }

  await migrateTranslations(db, "../../../documentation/content/Bible_Native_MasoreticSBL.VPL.txt", "native");
  await migrateTranslations(db, "../../../documentation/content/Bible_En_ESV_2001.VPL.txt", "en");
  await migrateTranslations(db, "../../../documentation/content/Bible_Ar_SVD_1865.VPL.txt", "ar");

  await db.close();
}

async function migrateTranslations(db: Database, filePath: string, lang: string) {
  const BibleData = await readFile(filePath, "utf-8");
  const lines = BibleData.split("\n");

  let bookId: number | undefined = 0;
  let chapterId: number | undefined = 0;
  let verseId: number | undefined = 0;

  for (const line of lines) {
    const result = line.match(/^([A-Z0-9]+)\s(\d+):(\d+)\s(.*)$/);
    if (!result) continue;

    const bookKey = result[1];
    const chapterNum = parseInt(result[2]);
    const verseNum = parseInt(result[3]);
    let text = result[4];

    let textNormalized = text;
    const textDiacritized = text;

    if (lang === Lang.ARABIC) {
      text = replaceWaslaAlef(text);
      text = removeArDiacritics(text);
      textNormalized = normalizeArText(text);
    } else if (lang === Lang.NATIVE) {
      text = removeNaDiacritics(text);
      textNormalized = text;
    }

    if (chapterNum === 1 && verseNum === 1) {
      bookId = (await db.get(`SELECT id FROM book WHERE bookKey = ?`, [bookKey]))?.id;
      console.log(bookId, bookKey, "--- processing");
    }

    if (verseNum === 1) {
      chapterId = (await db.get(`SELECT id FROM chapter WHERE bookId = ? AND num = ?`, [bookId, chapterNum]))?.id;
    }

    const verseResult = await db.get(`SELECT id FROM verse WHERE chapterId = ? AND num = ?`, [chapterId, verseNum]);

    if (!verseResult) {
      const res = await db.run(`INSERT INTO verse (num, chapterId) VALUES (?, ?)`, [verseNum, chapterId]);
      verseId = res.lastID;
    } else {
      verseId = verseResult.id;
    }

    await db.run(
      `INSERT OR IGNORE INTO verse_translation (verseId, lang, text, textNormalized, textDiacritized) VALUES (?, ?, ?, ?, ?)`,
      [verseId, lang, text, textNormalized, textDiacritized]
    );
  }
}

initDatabase();
