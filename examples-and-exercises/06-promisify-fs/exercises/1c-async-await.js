// require dependencies
const fs = require(`fs`);
const path = require(`path`);
const assert = require(`assert`);
const util = require("util");

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId} (${Date.now() - START} ms):\n`, value);

// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const readFilePromise = util.promisify(fs.readFile);
const writeFilePromise = util.promisify(fs.writeFile);

const fileName = process.argv[2];
const filePath = path.join(__dirname, fileName);
log(1, filePath);

const newFileContent = process.argv[3];
log(2, newFileContent);

const writeReadAssert = async (toWrite) => {
  try {
    log(3, `writing ${fileName} ...`);

    await writeFilePromise(filePath, toWrite);
    log(4, `reading ${fileName} ...`);

    const fileContent = await readFilePromise(filePath, "utf-8");

    log(5, `asserting ...`);
    assert.strictEqual(fileContent, newFileContent);
    log(6, "\033[32mpass!\x1b[0m");
    fs.appendFileSync(__filename, `\n// pass: ${new Date().toLocaleString()}`);
  } catch (err) {
    console.error(err);
  }
};

writeReadAssert(newFileContent);

// pass: 2/27/2021, 9:39:16 AM