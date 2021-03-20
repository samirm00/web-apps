"use strict";
const repeater = require("./repeater.js");

const userInput = process.argv.slice(2);

const repeatedString = userInput[0];
const repeatedTime = Number(userInput[1]);

// make sure the @repeatedString is a text

if (typeof repeatedString !== "string") {
  throw new Error("Please enter a string as a first input");
}

// make sure that @repeatedTime is a number

if (typeof repeatedTime !== "number") {
  throw new Error("Please enter a number as second input ");
}

// make sure that @repeatedTime is not NaN

if (Number.isNaN(repeatedTime)) {
  throw new Error("Please enter a number as second input ");
}

console.log(repeater(repeatedString, repeatedTime));
