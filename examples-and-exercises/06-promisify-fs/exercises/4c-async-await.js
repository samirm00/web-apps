// require dependencies
const fs = require("fs");
const path = require("path");
const assert = require("assert");
const util = require("util");

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId} (${Date.now() - START} ms):\n`, value);

// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const fileName1 = process.argv[2];
const filePath1 = path.join(__dirname, fileName1);
log(1, filePath1);

const fileName2 = process.argv[3];
const filePath2 = path.join(__dirname, fileName2);
log(2, filePath2);
const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.readFile);

const writeReadAssert = async () => {
  try {
    log(3, `reading ${fileName1} ...`);
    const oldFile1 = await readFilePromise(filePath1, "utf-8");

    log(4, `reading ${fileName2} ...`);
    const oldFile2 = await readFilePromise(filePath2, "utf-8");

    log(5, `writing ${fileName1} ...`);
    await writeFilePromise(filePath1, oldFile2);

    log(6, `writing ${fileName2} ...`);
    await writeFilePromise(filePath2, oldFile1);

    log(7, `reading ${fileName1} ...`);
    const newFile1 = await readFilePromise(filePath1, "utf-8");

    log(8, "asserting new file 1 contents ...");
    assert.strictEqual(newFile1, oldFile2);

    log(9, `reading ${fileName2} ...`);
    const newFile2 = await readFilePromise(filePath2, "utf-8");

    log(10, "asserting new file 2 contents ...");
    assert.strictEqual(newFile2, oldFile1);

    log(11, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error(err);
  }
};
writeReadAssert();

// pass: 2/27/2021, 4:19:00 PM
