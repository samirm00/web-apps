"use strict";

const generateList = require("./generate-list.js");

const numberedFlag = "--numbered";

// read CLI arguments
let userInput = [];
for (let i = 2; i < process.argv.length; i++) {
  userInput.push(process.argv[i]);
}
console.log(userInput);

// check if any of them are the numberedFlag

const numbered = userInput.includes(numberedFlag);
console.log(numbered);
// remove the numbered flag from the CLI arguments so it doesn't become a list item

const cleanedUserInput = userInput.filter((item) => item !== numberedFlag);

// call the generateList function
const result = generateList(cleanedUserInput, numbered);

// log the result
console.log(result);
