const fs = require('fs');
const path = require('path');
const textToSpeech = require('@google-cloud/text-to-speech');

// Creates a client
const client = new textToSpeech.TextToSpeechClient({
  keyFilename: path.resolve(__dirname, "../../.secrets", 'amen24-69e9f5cade0d.json')
});

// Path to save the MP3 files
const outputDir = './output_chapters';

// Make sure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Read the content from the output.txt file
const filePath = './output.txt';
const content = fs.readFileSync(filePath, 'utf-8');

// Split the text into chapters based on "سِفْرُ"
const chapters = content.split('سِفْرُ').filter(ch => ch.trim()).map(ch => 'سِفْرُ' + ch.trim());

// Helper: split text into parts under 5000 bytes
function splitTextByByteLimit(text, limit = 4900) {
  const parts = [];
  let current = '';

  for (const paragraph of text.split('\n')) {
    const testChunk = current + paragraph + '\n';
    const byteLength = Buffer.byteLength(testChunk, 'utf-8');

    if (byteLength > limit) {
      if (current.trim()) {
        parts.push(current.trim());
      }
      current = paragraph + '\n';
    } else {
      current = testChunk;
    }
  }

  if (current.trim()) {
    parts.push(current.trim());
  }

  return parts;
}


async function generateMP3ForChapter(chapterText, chapterNumber) {
  const chunks = splitTextByByteLimit(chapterText);

  const buffers = [];

  for (let i = 0; i < chunks.length; i++) {
    const request = {
      input: { text: chunks[i] },
      voice: { languageCode: 'ar-XA', ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };

    try {
      const [response] = await client.synthesizeSpeech(request);
      buffers.push(Buffer.from(response.audioContent, 'binary'));
      console.log(`Chunk ${i + 1}/${chunks.length} for Chapter ${chapterNumber} generated.`);
    } catch (error) {
      console.error(`Error generating chunk ${i + 1} for Chapter ${chapterNumber}:`, error);
    }
  }

  // Concatenate all chunks into one MP3 file
  const finalBuffer = Buffer.concat(buffers);
  const outputPath = path.join(outputDir, `chapter_${chapterNumber}.mp3`);
  fs.writeFileSync(outputPath, finalBuffer);
  console.log(`✅ MP3 file for Chapter ${chapterNumber} saved.`);
}

// Loop through each chapter and generate the MP3 files
async function generateMP3Files() {
  for (let i = 0; i < chapters.length; i++) {
    await generateMP3ForChapter(chapters[i], i + 1);
  }
}

// Start the process
generateMP3Files();
