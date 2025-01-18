const fs = require('fs');
const sqlite = require("sqlite3").verbose();

function readFileLines(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) return reject(err);

      const lines = data.split("\n").map(line => line.trim()).filter(line => line.length > 0);
      resolve(lines);
    })
  })
}

function initializeDatabase(dbPath, lines) {
  return new Promise((resolve, reject) => {
    const db = new sqlite.Database(
      dbPath,
      sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE,
      (err) => {
        if (err) return reject(err);

        db.run(
          `CREATE TABLE IF NOT EXISTS versesEn (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          num INTEGER NOT NULL,
          text TEXT NOT NULL
          )`,
          (err) => {
            if (err) return reject(err);

            db.serialize(() => {
              db.run("BEGIN TRANSACTION");

              const stmt = db.prepare(
                "INSERT INTO versesEn (num, text) VALUES (?, ?)"
              );

              lines.forEach((line) => {
                stmt.run(1, line);
              });

              stmt.finalize((err) => {
                if (err) return reject(err);

                db.run("COMMIT", (err) => {
                  if (err) return reject(err);

                  console.log("All lines successfully inserted into database.");
                  db.close();
                  resolve();
                });
              });
            });
          }
        );
      }
    );
  });
};

async function main() {
  const filePath = "../content/Holy-Bible---English---Free-Bible-Version---Source-Edition.VPL.txt";
  const dbPath = "example.db";
  try {
    const lines = await readFileLines(filePath);
    await initializeDatabase(dbPath, lines);
  } catch (error) {
    console.error("An error occurred", error);
  }
}

main();
