/* helpful examples
  read-text.js
  write-text.js
*/

// require dependencies
const fs = require("fs");
const assert = require("assert");

// declare constants
const START = Date.now();
const FILE_PATH = __dirname + "/file.txt";

// declare logging function
const log = (logId, value) =>
  console.log(
    `\nlog ${logId}, ${Date.now() - START} ms: ${typeof value}\n`,
    value
  );

// --- main script ---

const newFileContents = "*[]*";
log(1, newFileContents);

log(2, "writing file ...");
fs.writeFileSync(FILE_PATH, newFileContents);

log(3, "reading file ...");
const fileContent = fs.readFileSync(FILE_PATH, "utf-8");

assert.strictEqual(fileContent, newFileContents);
log(4, "\033[32mpass!\x1b[0m");
