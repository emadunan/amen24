import { Database } from "sqlite3";
import { open } from "sqlite";

// this is a top-level await
(async () => {
  // open the database
  const db = await open({
    filename: "data/database.db",
    driver: Database,
  });

  // CREATE Books Entity
  await db.exec(
    `CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE
      )`
  );

  // CREATE Chapters Entity
  await db.exec(
    `CREATE TABLE IF NOT EXISTS chapters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      num INTEGER NOT NULL,
      bookId INTEGER NOT NULL,
      FOREIGN KEY (bookId) REFERENCES books (id),
      UNIQUE (num, bookId)
      )`
  );

  // CREATE Verses Entity -- ENGLISH
  await db.exec(
    `CREATE TABLE IF NOT EXISTS versesEn (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      num INTEGER NOT NULL,
      text TEXT NOT NULL,
      chapterId INTEGER NOT NULL,
      FOREIGN KEY (chapterId) REFERENCES chapters (id)
      )`
  );

  console.log("Books, Chapters, and VersesEn tables have been created!!!");
  
})();
