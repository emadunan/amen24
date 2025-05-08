const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.resolve(__dirname, "../../.secrets", 'amen24-69e9f5cade0d.json')
});

const outputDir = './output_chapters';
const tempDir = './temp_chapters';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

const filePath = './output.txt';
const content = fs.readFileSync(filePath, 'utf-8');

const chapters = content.split('سِفْرُ')
  .filter(chapter => chapter.trim() !== '')
  .map(chapter => 'سِفْرُ' + chapter.trim());

function splitTextIntoChunks(text, maxBytes) {
  const lines = text.split('\n');
  let chunks = [];
  let chunk = '';
  let size = 0;

  for (const line of lines) {
    const lineSize = Buffer.byteLength(line, 'utf8');
    if (size + lineSize > maxBytes) {
      chunks.push(chunk);
      chunk = line;
      size = lineSize;
    } else {
      chunk += (chunk ? '\n' : '') + line;
      size += lineSize;
    }
  }
  if (chunk) chunks.push(chunk);
  return chunks;
}

async function generateMP3ForChapter(chapterText, chapterNumber) {
  const lines = chapterText.split('\n');
  const firstLine = lines[0];
  const restText = lines.slice(1).join('\n');

  const chunks = splitTextIntoChunks(restText, 5000);
  const chunkFiles = [];

  for (let i = 0; i < chunks.length; i++) {
    let chunkSSML = '';

    if (i === 0) {
      // First chunk includes the chapter title and 500ms break
      chunkSSML = `
        <speak>
          ${firstLine}
          <break time="500ms"/>
          ${chunks[i]}
        </speak>
      `;
    } else {
      // Other chunks are just normal SSML
      chunkSSML = `
        <speak>
          ${chunks[i]}
        </speak>
      `;
    }

    const request = {
      input: { ssml: chunkSSML },
      voice: { languageCode: 'ar-XA', name: 'ar-XA-Wavenet-D', ssmlGender: 'FEMALE' },
      audioConfig: { audioEncoding: 'MP3' },
    };
    

    try {
      const [response] = await client.synthesizeSpeech(request);
      const chunkPath = path.join(tempDir, `chapter_${chapterNumber}_chunk_${i + 1}.mp3`);
      fs.writeFileSync(chunkPath, response.audioContent, 'binary');
      console.log(`Chunk ${i + 1} for chapter ${chapterNumber} saved.`);
      chunkFiles.push(fs.readFileSync(chunkPath));
    } catch (err) {
      console.error(`Error generating chunk ${i + 1} for chapter ${chapterNumber}:`, err);
    }
  }

  // Merge all chunks
  const finalBuffer = Buffer.concat(chunkFiles);
  const finalPath = path.join(outputDir, `chapter_${chapterNumber}_final.mp3`);
  fs.writeFileSync(finalPath, finalBuffer);
  console.log(`Final MP3 for chapter ${chapterNumber} saved.`);
}


async function generateMP3Files() {
  for (let i = 0; i < chapters.length; i++) {
    await generateMP3ForChapter(chapters[i], i + 1);
  }
}

generateMP3Files();
