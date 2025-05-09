const fs = require('fs');
const readline = require('readline');
const path = require('path');

const bookMap = {
  "GEN": "سِفْرُ ٱلتَّكْوِين",
  "EXO": "سِفْرُ ٱلْخُرُوج",
  "LEV": "سِفْرُ ٱللَّاوِيِّين",
  "NUM": "سِفْرُ ٱلْعَدَّد",
  "DEU": "سِفْرُ ٱلتَّثْنِيَة",
  "JOS": "سِفْرُ يَشُوع",
  "JDG": "سِفْرُ ٱلْقُضَاة",
  "RUT": "سِفْرُ رَاعُوث",
  "1SA": "سِفْرُ صَمُوئِيل ٱلْأَوَّل",
  "2SA": "سِفْرُ صَمُوئِيل ٱلثَّانِي",
  "1KI": "سِفْرُ ٱلْمُلُوك ٱلْأَوَّل",
  "2KI": "سِفْرُ ٱلْمُلُوك ٱلثَّانِي",
  "1CH": "سِفْرُ أَخْبَارِ ٱلْأَيَّام ٱلْأَوَّل",
  "2CH": "سِفْرُ أَخْبَارِ ٱلْأَيَّام ٱلثَّانِي",
  "EZR": "سِفْرُ عَزْرَا",
  "NEH": "سِفْرُ نَحَمْيَا",
  "EST": "سِفْرُ أَسْتِير",
  "JOB": "سِفْرُ أَيُّوب",
  "PSA": "سِفْرُ ٱلْمَزَامِير",
  "PRO": "سِفْرُ ٱلْأَمْثَال",
  "ECC": "سِفْرُ ٱلْجَامِعَة",
  "SOL": "سِفْرُ نَشِيدِ ٱلْأَنْشَادِ",
  "ISA": "سِفْرُ إِشَعْيَاء",
  "JER": "سِفْرُ إِرْمِيَا",
  "LAM": "سِفْرُ ٱلْمَرَاثِي",
  "EZE": "سِفْرُ حِزْقِيَال",
  "DAN": "سِفْرُ دَانِيَال",
  "HOS": "سِفْرُ هُوشَع",
  "JOE": "سِفْرُ يُوئِيل",
  "AMO": "سِفْرُ عَامُوس",
  "OBA": "سِفْرُ عُوبَدْيَا",
  "JON": "سِفْرُ يُونَان",
  "MIC": "سِفْرُ مِيخَا",
  "NAH": "سِفْرُ نَاحُوم",
  "HAB": "سِفْرُ حَبَقُّوق",
  "ZEP": "سِفْرُ صَفَنْيَا",
  "HAG": "سِفْرُ حَجَّي",
  "ZEC": "سِفْرُ زَكَرِيَّا",
  "MAL": "سِفْرُ مَلَاخِي",
  "MAT": "إِنْجِيل مَتَّى",
  "MAR": "إِنْجِيل مَرْقُس",
  "LUK": "إِنْجِيل لُوقَا",
  "JOH": "إِنْجِيل يُوحَنَّا",
  "ACT": "سِفْرُ أَعْمَالِ ٱلرُّسُل",
  "ROM": "رِسَالَةُ رُومِيَّة",
  "1CO": "رِسَالَةُ كُورِنْثُوس ٱلْأُولَى",
  "2CO": "رِسَالَةُ كُورِنْثُوس ٱلثَّانِيَة",
  "GAL": "رِسَالَةُ غَلَاطِيَّة",
  "EPH": "رِسَالَةُ أَفَسُس",
  "PHI": "رِسَالَةُ فِيلِبِّي",
  "COL": "رِسَالَةُ كُولُوسِّي",
  "1TH": "رِسَالَةُ تَسَالُونِيكِي ٱلْأُولَى",
  "2TH": "رِسَالَةُ تَسَالُونِيكِي ٱلثَّانِيَة",
  "1TI": "رِسَالَةُ تِيمُوثَاوُس ٱلْأُولَى",
  "2TI": "رِسَالَةُ تِيمُوثَاوُس ٱلثَّانِيَة",
  "TIT": "رِسَالَةُ تِيطُس",
  "PHM": "رِسَالَةُ فِيلِيمُون",
  "HEB": "رِسَالَةُ ٱلْعِبْرَانِيِّين",
  "JAM": "رِسَالَةُ يَعْقُوب",
  "1PE": "رِسَالَةُ بُطْرُس ٱلْأُولَى",
  "2PE": "رِسَالَةُ بُطْرُس ٱلثَّانِيَة",
  "1JO": "رِسَالَةُ يُوحَنَّا ٱلْأُولَى",
  "2JO": "رِسَالَةُ يُوحَنَّا ٱلثَّانِيَة",
  "3JO": "رِسَالَةُ يُوحَنَّا ٱلثَّالِثَة",
  "JUD": "رِسَالَةُ يَهُوذَا",
  "REV": "سِفْرُ ٱلرُّؤْيَا"
};

const inputFile = path.resolve(__dirname, '..', 'Bible_Ar_SVD_1865.VPL.txt');
const outputDir = path.resolve(__dirname, 'text');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

const readInterface = readline.createInterface({
  input: fs.createReadStream(inputFile),
  crlfDelay: Infinity,
});

let idx = 0;
let currentBook = '';
let currentChapter = '';
let outputLines = [];

readInterface.on('line', (line) => {
  const match = line.match(/^(\w+)\s+(\d+):(\d+)\s+(.+)/);
  if (!match) return;

  const [_, book, chapter, verse, text] = match;
  const bookTitle = bookMap[book] || book;

  // If new book starts, write old book file and reset
  if (book !== currentBook && currentBook !== '') {
    idx++;
    const paddedIdx = String(idx).padStart(2, '0');

    const outputFile = path.join(outputDir, `${paddedIdx}_${currentBook}.txt`);
    fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf8');
    console.log(`✅ Saved ${outputFile}`);
    outputLines = [];
  }

  // New book header
  if (book !== currentBook || chapter !== currentChapter) {
    // Update current tracking
    currentBook = book;
    currentChapter = chapter;

    // Add chapter title without a pause before it
    outputLines.push(`${book}:${chapter}`);
    outputLines.push(`${bookTitle || book}, ٱلْأَصْحَاحُ ${chapter}`);
    outputLines.push(`[SilenceAfterChapterTitle]`);
  }

  outputLines.push(text.trim());
});

readInterface.on('close', () => {
  // Save last book
  if (currentBook && outputLines.length > 0) {
    const outputFile = path.join(outputDir, `66_${currentBook}.txt`);
    fs.writeFileSync(outputFile, outputLines.join('\n'), 'utf8');
    console.log(`✅ Saved ${outputFile}`);
  }

  console.log('📚 All books parsed.');
});