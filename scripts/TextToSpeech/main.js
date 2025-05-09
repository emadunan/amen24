const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');
const { execSync } = require('child_process');

// Google TTS client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.resolve(__dirname, '../../.secrets', 'amen24-69e9f5cade0d.json')
});

// Create output folders if not exists
if (!fs.existsSync('mp3')) fs.mkdirSync('mp3');
if (!fs.existsSync('temp')) fs.mkdirSync('temp');

// Read and parse the input
const inputFile = process.argv[2] || 'text/64_3JO.txt';
const inputBaseName = path.basename(inputFile, path.extname(inputFile));
const inputText = fs.readFileSync(inputFile, 'utf8');

// Match format: "GEN:1\nChapter content..."
const chapterRegex = /([A-Z]+:\d+)\n([\s\S]*?)(?=\n[A-Z]+:\d+|\n*$)/g;
const matches = [...inputText.matchAll(chapterRegex)];

const CHUNK_BYTE_LIMIT = 4500;
const SILENCE_MARK = '[[SILENCE]]';

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, '_');
}

async function synthesizeTextToFile(text, filename) {
  const request = {
    input: { text },
    voice: {
      languageCode: 'ar-XA',
      name: "ar-XA-Chirp3-HD-Enceladus",
      ssmlGender: 'MALE'
    },
    audioConfig: { audioEncoding: 'MP3' },
  };

  const [response] = await client.synthesizeSpeech(request);
  fs.writeFileSync(filename, response.audioContent, 'binary');
  console.log(`Generated audio: ${filename}`);
}

function splitTextIntoChunks(text, maxBytes) {
  const sentences = text.split(/(?<=\n|[.!؟])\s+/);
  const chunks = [];

  let currentChunk = '';
  let currentBytes = 0;

  for (const sentence of sentences) {
    const sentenceBytes = Buffer.byteLength(sentence, 'utf8');

    if (currentBytes + sentenceBytes > maxBytes) {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = sentence;
      currentBytes = sentenceBytes;
    } else {
      currentChunk += sentence + ' ';
      currentBytes += sentenceBytes;
    }
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim());

  return chunks;
}

async function synthesizeChapter(title, text, index) {
  const safeTitle = sanitizeFilename(title);
  const segmentFiles = [];
  let partIndex = 0;

  // Replace [SilenceAfterChapterTitle] with placeholder for splitting
  const segments = text.replace(/\[SilenceAfterChapterTitle\]/g, SILENCE_MARK).split(SILENCE_MARK);

  for (const segment of segments) {
    const chunks = splitTextIntoChunks(segment, CHUNK_BYTE_LIMIT);

    for (const chunk of chunks) {
      const partPath = path.join('temp', `${safeTitle}_part${partIndex++}.mp3`);
      await synthesizeTextToFile(chunk, partPath);
      segmentFiles.push(partPath);
    }

    // Insert silence after segment
    segmentFiles.push('silence_0.5s.mp3');
  }

  // Remove trailing silence if exists
  if (segmentFiles[segmentFiles.length - 1] === 'silence_0.5s.mp3') {
    segmentFiles.pop();
  }

  // Write ffmpeg concat list
  const listPath = path.join('temp', `${safeTitle}_list.txt`);

  const chapterNumber = String(index + 1).padStart(3, '0'); // "001", "002", etc.
  const outputPath = path.join('mp3', `${inputBaseName}__${chapterNumber}.mp3`);

  const concatList = segmentFiles.map(f => `file '${path.resolve(f).replace(/'/g, "'\\''")}'`).join('\n');
  fs.writeFileSync(listPath, concatList);

  // Re-encode and concatenate to avoid DTS errors
  const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i "${listPath}" -ar 24000 -ac 1 -b:a 64k "${outputPath}"`;
  execSync(ffmpegCmd, { stdio: 'inherit' });

  console.log(`✅ Saved final audio: ${outputPath}`);
}

(async () => {
  for (const [index, match] of matches.entries()) {
  const title = match[1];
  const chapterText = match[2];
  console.log(`\n🔊 Processing chapter: ${title}`);
  await synthesizeChapter(title, chapterText.trim(), index);
}
})();
