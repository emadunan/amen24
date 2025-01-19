import { open, Database } from "sqlite";

import books from "../data/books.json";
import { readFile } from "fs/promises";

type BookKey = keyof typeof books;

async function initDatabase() {
  // open the database
  const db: Database = await open({
    filename: "../data/bible.db",
    driver: Database,
  });

  // Create Books and Chapters Entities
  try {
    await db.exec(
      `CREATE TABLE IF NOT EXISTS books (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT NOT NULL UNIQUE
        )`
    );

    await db.exec(
      `CREATE TABLE IF NOT EXISTS chapters (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num INTEGER NOT NULL,
        bookId INTEGER NOT NULL,
        FOREIGN KEY (bookId) REFERENCES books (id),
        UNIQUE (num, bookId)
        )`
    );

    console.log("Books and Chapters tables has been created!!!");
  } catch (error) {
    console.error("Error creating Books or chapters table:", error);
    throw new Error("Database operation failed!");
  }

  // Populate books and chapters
  for (const key in books) {
    if (Object.prototype.hasOwnProperty.call(books, key)) {
      const response = await db.run(`INSERT INTO books (key) VALUES (?)`, [
        key,
      ]);
      const bookId = response.lastID;

      const bookMaxlength = books[key as BookKey].len;
      const chapters = Array.from({ length: bookMaxlength }, (_, k) => k + 1);
      for (const chapter of chapters) {
        await db.run(`INSERT INTO chapters (num, bookId) VALUES (?, ?)`, [
          chapter,
          bookId,
        ]);
      }
    }
  }

  await migrate(
    db,
    "../../content/Holy-Bible---English---Free-Bible-Version---Source-Edition.VPL.txt",
    "versesEn"
  );

  await migrate(
    db,
    "../../content/Holy-Bible---Arabic---Arabic-Van-Dyck-Bible---Source-Edition.VPL.txt",
    "versesAr"
  );

  await migrate(db, "../../content/original-scripts.txt", "versesNative");

  await db.close();
}

async function migrate(db: Database, filePath: string, bibleVersion: string) {
  if (!/^[a-zA-Z0-9_]+$/.test(bibleVersion)) {
    throw new Error("Invalid table name");
  }

  try {
    await db.exec(
      `CREATE TABLE IF NOT EXISTS ${bibleVersion} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        num INTEGER NOT NULL,
        text TEXT NOT NULL,
        chapterId INTEGER NOT NULL,
        FOREIGN KEY (chapterId) REFERENCES chapters (id)
        )`
    );

    console.log("Verses table has been created!!!");
  } catch (error) {
    console.error("Error creating verses table:", error);
    throw new Error("Database operation failed!");
  }

  const BibleData = await readFile(filePath, "utf-8");

  const lines = BibleData.split("\n");

  let bookId: number | undefined = 0;
  let chapterId: number | undefined = 0;

  for (const line of lines) {
    const result = line.match(/^(\S+)\s(\d+):(\d+)\s(.*)$/);

    if (result) {
      const bookKey = result.at(1);
      const chapterNum = result.at(2);
      const verseNum = result.at(3);
      const verseText = result.at(4);

      if (chapterNum === "1" && verseNum === "1") {
        bookId = (await db.get(`SELECT id from books where key = ?`, [bookKey]))
          .id;

        console.log(bookId, bookKey, "--- processing!");
      }

      if (verseNum === "1") {
        chapterId = (
          await db.get(`SELECT id FROM chapters where bookId = ? AND num = ?`, [
            bookId,
            chapterNum,
          ])
        ).id;
      }

      await db.run(
        `INSERT INTO ${bibleVersion} (num, text, chapterId) VALUES (?, ?, ?)`,
        [verseNum, verseText, chapterId]
      );
    }
  }

  await db.close();
}

initDatabase();
