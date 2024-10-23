import { createReadStream, createWriteStream } from "fs";
import { createInterface } from "readline";
import { Transform } from "stream";

class WordProcessingStream extends Transform {
  constructor() {
    super({ readableObjectMode: true, writableObjectMode: true });
    this.wordCount = {};
  }

  _transform(chunk, _, callback) {
    const words = chunk
      .toString()
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    words.forEach(word => {
      if (word) {
        this.wordCount[word] = (this.wordCount[word] || 0) + 1;
      }
    });

    callback();
  }

  _flush(callback) {
    const vector = Object.keys(this.wordCount)
      .sort()
      .map(word => {
        return { word: word, count: this.wordCount[word] };
      });

    this.push(vector);
    callback();
  }
}

function processTextFile(inputFile, outputFile) {
  const readStream = createReadStream(inputFile, "utf8");
  const rl = createInterface({ input: readStream });

  const wordProcessingStream = new WordProcessingStream();
  const writeStream = createWriteStream(outputFile);

  rl.on("line", line => {
    wordProcessingStream.write(line);
  });
  rl.on("close", () => {
    wordProcessingStream.end();
  });

  wordProcessingStream.on("data", vector => {
    const indexArr = [];

    writeStream.write(`{\n`);
    vector.map(vec => {
      writeStream.write(`  "${vec.word}": ${vec.count},\n`);
      indexArr.push(vec.count);
    });
    writeStream.write(`}\n\n`);
    //{
    //  word: count;
    //}

    writeStream.write(`[${indexArr.join(", ")}]`);
    // [1, 2, 34]
  });

  wordProcessingStream.on("end", () => {
    writeStream.end();
  });

  readStream.on("error", err => {
    console.error("Ошибка чтения файла:", err);
  });

  writeStream.on("error", err => {
    console.error("Ошибка записи файла:", err);
  });
}

const inputFile = process.argv[2];
const outputFile = process.argv[3];

if (!inputFile || !outputFile) {
  console.error("Укажите входной и выходной файл как аргументы.");
  process.exit(1);
}

processTextFile(inputFile, outputFile);
