const fs = require("fs");
const readline = require("readline");

function extractReference(line) {
  const match = line.trim().match(/^(\S+\s+\d+:\d+)/); // Extracts "BOOK CHAPTER:VERSE"
  return match ? match[1] : null;
}

async function compareFiles(file1, file2) {
  const stream1 = readline.createInterface({
    input: fs.createReadStream(file1, 'utf-8'),
    crlfDelay: Infinity,
  });

  const stream2 = readline.createInterface({
    input: fs.createReadStream(file2, 'utf-8'),
    crlfDelay: Infinity,
  });

  let lineNum = 1;

  const iter1 = stream1[Symbol.asyncIterator]();
  const iter2 = stream2[Symbol.asyncIterator]();

  while (true) {
    const [result1, result2] = await Promise.all([iter1.next(), iter2.next()]);

    if (result1.done || result2.done) break;

    const ref1 = extractReference(result1.value);
    const ref2 = extractReference(result2.value);

    if (ref1 !== ref2) {
      console.log(`Line ${lineNum}: ${ref1} !== ${ref2}`);
      break;
    }

    lineNum++;
  }

  stream1.close();
  stream2.close();
}

const file1Path = "Bible_ESV_2001.txt";
const file2Path = "Bible_ORIGINAL.txt";

compareFiles(file1Path, file2Path);