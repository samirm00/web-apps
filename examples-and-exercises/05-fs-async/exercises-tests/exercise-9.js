/* reverse-engineering

  To understand what this exercise should do,
  practice using exercise-9-demo in the terminal

  your task is to reverse-engineer the behavior of the demo

  you'll know you've finished when it's impossible to tell
    if you're using the demo or your exercise
*/

// require dependencies
const fs = require("fs");

// declare constants
const START = Date.now();
const DOC_STRING = `
COMMANDS:

  list
    logs all of the file names in the current directory

  write <fileName> <text>
    writes the <text> the file with <fileName>

  append <fileName> <text>
    appends the <text> the file with <fileName>

FLAGS:

  -h
    print this helpful message
`;

// declare logging function
const log = (logId, value) =>
  console.log(`\nlog ${logId}, ${Date.now() - START} ms. \n`, value);

// --- main script ---

// fill in the _'s to reverse-engineer the behavior of exercise-9-demo.min.js

if (process.argv.includes("-h")) {
  log("0", DOC_STRING);
  process.exit(0);
}

const command = process.argv[2];
const fileName = process.argv[3];
const text = process.argv[4];

if (!command) {
  log("1.a", "a command is required, exiting");
  process.exit(0);
}
log("1.b", "command:" + command);

if (command === "list") {
  log("2", "listing file names");
  const fileNames = fs.readdirSync(__dirname);
  fileNames.forEach((file) => console.log(`${file}\n`));
  log("3", fileNames);
  process.exit(0);
}

if (!fileName) {
  log("4.1", "the file name is required, exciting");
  process.exit(0);
}
log("4.2", "fileName: " + fileName);

if (!text) {
  log("5.1", " a text is required , exiting ");
  process.exit(0);
}
log("5.2", "text : " + text);

if (command === "write") {
  log("6.1", "writing " + text + " to " + fileName);
  fs.writeFile(__dirname + "/" + fileName, text, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("6.2", "wrote to file has been done successfully ");
  });
} else if (command === "append") {
  log("7.1", "appending " + text + " to " + fileName);
  fs.appendFile(__dirname + "/" + fileName, text, (err) => {
    if (err) {
      console.error(err);
    }
    console.log("7.2", "appended to file has been done successfully ");
  });
} else {
  log("8", "unknown command:  " + command);
}
