// require dependencies
const fs = require("fs");
const path = require("path");
const assert = require("assert");

// declare constants
const EXERCISE_NAME = path.basename(__filename);
const START = Date.now();

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId} (${Date.now() - START} ms):\n`, value);

// --- main script ---
console.log(`\n--- ${EXERCISE_NAME} ---`);

const filePath = path.join(__dirname, process.argv[2]);
log(1, filePath);

const toAppend = process.argv[3];
log(2, toAppend);

const numberOfTimes = Number(process.argv[4]);
log(3, numberOfTimes);

log(4, "reading old contents ...");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    console.error(err);
  }

  const oldContents = data;

  for (let i = 1; i <= numberOfTimes; i++) {
    log(4 + i, `appending ...`);
    fs.appendFile(filePath, toAppend, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  log(numberOfTimes + 5, "reading new contents ...");

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }

    const newContents = data;

    log(numberOfTimes + 6, "asserting file contents ...");
    const expectedContents = oldContents + toAppend.repeat(numberOfTimes);
    assert.strictEqual(newContents, expectedContents);

    log(numberOfTimes + 7, "\033[32mpass!\x1b[0m");

    fs.appendFile(
      filePath,
      `\n// pass: ${new Date().toLocaleString()}`,
      (err) => {
        if (err) {
          console.error(err);
        }
        console.log("appended successfully ");
      }
    );
  });
});
