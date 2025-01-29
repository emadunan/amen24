import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

const normalizeArabicText = (text: string): string => {
  // Remove Arabic diacritics
  const diacriticsRegex = /[\u064B-\u065F]/g;
  text = text.replace(diacriticsRegex, '');

  // Normalize specific Arabic characters
  const normalizationMap: { [key: string]: string } = {
    'آ': 'ا', // Alef with Madda → Alef
    'أ': 'ا', // Alef with Hamza Above → Alef
    'إ': 'ا', // Alef with Hamza Below → Alef
    'ٱ': 'ا', // Alef Wasla → Alef (Missed in original)
    'ة': 'ه', // Teh Marbuta → Heh
    'ى': 'ي', // Alef Maksura → Yeh
    'ؤ': 'و', // Waw with Hamza → Waw
    'ئ': 'ي', // Yeh with Hamza → Yeh
    'ٮ': 'ب', // Old Arabic Ba → Ba
    'ٯ': 'ف', // Old Arabic Fa → Fa
    'ڤ': 'ف', // Persian V → Fa (used in some Arabic dialects)
    'پ': 'ب', // Persian Peh → Ba
    'چ': 'ج', // Persian Cheh → Jeem
    'گ': 'ك', // Persian Gaf → Kaf
    '٠': '0',
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9', // Arabic digits → Standard digits
  };

  text = text.replace(/[آأإٱةىؤئٮٯڤپچگ٠-٩]/g, (char) => normalizationMap[char]);

  return text;
};

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


    const allVerses = await db.all<{id: number, text: string, textNormalized: string}[]>(`SELECT * FROM versesAr`);

    const updateStmt = await db.prepare(`UPDATE versesAr SET textNormalized = ? WHERE id = ?`);

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