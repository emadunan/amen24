const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');
const { execSync } = require('child_process');

// Google TTS client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.resolve(__dirname, '../../.secrets', 'amen24sa-key.json')
});

// Create output folders if not exists
if (!fs.existsSync('mp3')) fs.mkdirSync('mp3');
if (!fs.existsSync('temp')) fs.mkdirSync('temp');

// Read and parse the input
const inputFile = process.argv[2] || 'text/64_3JO.txt';
const inputBaseName = path.basename(inputFile, path.extname(inputFile));
const inputText = fs.readFileSync(inputFile, 'utf8');

// Match format: "GEN:1\nChapter content..."
const chapterRegex = /([0-9A-Z]+:\d+)\n([\s\S]*?)(?=\n[0-9A-Z]+:\d+|\n*$)/g;
const matches = [...inputText.matchAll(chapterRegex)];

const CHUNK_BYTE_LIMIT = 4500;
const MAX_SENTENCE_BYTES = 900;
const SILENCE_MARK = '[[SILENCE]]';

function sanitizeFilename(name) {
  return name.replace(/[^a-zA-Z0-9_]/g, '_');
}

function splitIntoLogicalSentences(text) {
  const rawSentences = text
    .split(/(?<=[.!؟])\s+|[\n]+|(?<=،|؛)\s+/)
    .map(s => s.trim())
    .filter(Boolean);

  const sentences = [];

  for (let sentence of rawSentences) {
    const sentenceBytes = Buffer.byteLength(sentence, 'utf8');

    if (sentenceBytes <= MAX_SENTENCE_BYTES) {
      sentences.push(sentence);
    } else {
      // Split oversized sentence by words
      const words = sentence.split(/\s+/);
      let current = '';
      let currentBytes = 0;

      for (const word of words) {
        const wordWithSpace = word + ' ';
        const wordBytes = Buffer.byteLength(wordWithSpace, 'utf8');

        if (wordBytes > MAX_SENTENCE_BYTES) {
          console.warn(`⚠️ Skipping oversized word: "${word}" (${wordBytes} bytes)`);
          continue;
        }

        if (currentBytes + wordBytes > MAX_SENTENCE_BYTES) {
          if (current.trim()) sentences.push(current.trim());
          current = wordWithSpace;
          currentBytes = wordBytes;
        } else {
          current += wordWithSpace;
          currentBytes += wordBytes;
        }
      }

      if (current.trim()) sentences.push(current.trim());
    }
  }

  return sentences;
}

function splitTextIntoChunks2(text, maxBytes) {
  const sentences = splitIntoLogicalSentences(text);
  const smallSentences = [];

  for (let sentence of sentences) {
    const bytes = Buffer.byteLength(sentence, 'utf8');

    if (bytes <= MAX_SENTENCE_BYTES) {
      smallSentences.push(sentence.trim());
    } else {
      // Split oversized sentence by punctuation
      const words = sentence.split(/(?<=[،؛,;:—])\s+| +/);
      let partial = '';
      let partialBytes = 0;

      for (let word of words) {
        const wordWithSpace = word + ' ';
        const wordBytes = Buffer.byteLength(wordWithSpace, 'utf8');

        if (wordBytes > MAX_SENTENCE_BYTES) {
          throw new Error(`❌ Word too large to synthesize: "${word}" (${wordBytes} bytes)`);
        }

        if (partialBytes + wordBytes > MAX_SENTENCE_BYTES) {
          if (partial.trim()) smallSentences.push(partial.trim());
          partial = wordWithSpace;
          partialBytes = wordBytes;
        } else {
          partial += wordWithSpace;
          partialBytes += wordBytes;
        }
      }

      if (partial.trim()) smallSentences.push(partial.trim());
    }
  }

  // Pack into max 4500 byte chunks
  const chunks = [];
  let currentChunk = '';
  let currentBytes = 0;

  for (let s of smallSentences) {
    const sBytes = Buffer.byteLength(s + ' ', 'utf8');

    if (currentBytes + sBytes > maxBytes) {
      if (currentChunk.trim()) chunks.push(currentChunk.trim());
      currentChunk = s + ' ';
      currentBytes = sBytes;
    } else {
      currentChunk += s + ' ';
      currentBytes += sBytes;
    }
  }

  if (currentChunk.trim()) chunks.push(currentChunk.trim());

  return chunks;
}

async function synthesizeTextToFile(text, filename) {
  const sentences = splitIntoLogicalSentences(text);
  const files = [];

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const sentenceBytes = Buffer.byteLength(sentence, 'utf8');

    if (sentenceBytes > MAX_SENTENCE_BYTES) {
      throw new Error(`❌ Sentence too large to synthesize (>900 bytes): "${sentence.slice(0, 30)}..."`);
    }

    const request = {
      input: { text: sentence },
      voice: {
        languageCode: 'ar-XA',
        name: "ar-XA-Chirp3-HD-Enceladus",
        ssmlGender: 'MALE'
      },
      audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);

    const outFile = sentences.length === 1
      ? filename
      : filename.replace(/\.mp3$/, `_s${i}.mp3`);

    fs.writeFileSync(outFile, response.audioContent, 'binary');
    console.log(`🎙️  Generated audio: ${outFile}`);
    files.push(outFile);
  }

  // If multiple sentence files were generated, merge them into the original `filename`
  if (files.length > 1) {
    const listPath = filename.replace(/\.mp3$/, '_list.txt');
    const listContent = files.map(f => `file '${path.resolve(f).replace(/'/g, "'\\''")}'`).join('\n');
    fs.writeFileSync(listPath, listContent);

    execSync(`ffmpeg -y -f concat -safe 0 -i "${listPath}" -ar 24000 -ac 1 -b:a 64k "${filename}"`, {
      stdio: 'inherit'
    });

    // Cleanup intermediate files
    for (const f of files) fs.unlinkSync(f);
    fs.unlinkSync(listPath);
  }
}


async function synthesizeChapter(title, text, index) {
  const safeTitle = sanitizeFilename(title);
  const segmentFiles = [];
  let partIndex = 0;

  // Handle silence marker
  const segments = text.replace(/\[SilenceAfterChapterTitle\]/g, SILENCE_MARK).split(SILENCE_MARK);

  for (const segment of segments) {
    const chunks = splitTextIntoChunks2(segment, CHUNK_BYTE_LIMIT);

    for (const chunk of chunks) {
      const partPath = path.join('temp', `${safeTitle}_part${partIndex++}.mp3`);
      await synthesizeTextToFile(chunk, partPath);
      segmentFiles.push(partPath);
    }

    // Insert silence file
    segmentFiles.push('silence_0.5s.mp3');
  }

  // Remove trailing silence if added
  if (segmentFiles[segmentFiles.length - 1] === 'silence_0.5s.mp3') {
    segmentFiles.pop();
  }

  // Create ffmpeg concat list
  const listPath = path.join('temp', `${safeTitle}_list.txt`);
  const chapterNumber = String(index + 1).padStart(3, '0');
  const outputPath = path.join('mp3', `${inputBaseName}__${chapterNumber}.mp3`);
  const concatList = segmentFiles.map(f => `file '${path.resolve(f).replace(/'/g, "'\\''")}'`).join('\n');

  fs.writeFileSync(listPath, concatList);

  // Merge audio files
  const ffmpegCmd = `ffmpeg -y -f concat -safe 0 -i "${listPath}" -ar 24000 -ac 1 -b:a 64k "${outputPath}"`;
  execSync(ffmpegCmd, { stdio: 'inherit' });

  console.log(`✅ Saved final audio: ${outputPath}`);
}

(async () => {
  for (const [index, match] of matches.entries()) {
    const title = match[1];
    const chapterText = match[2];
    console.log(`\n📖 Processing chapter: ${title}`);
    await synthesizeChapter(title, chapterText.trim(), index);
  }
})();
