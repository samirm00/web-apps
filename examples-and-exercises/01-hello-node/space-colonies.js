/*
  The voyagers decide that they quite like this planet, and some of them want to settle there and colonise it.
  They call the planet "Alpha" and they decide that the FAMILIES whose last names start with 'A' should stay,
  while the others go on in search of other planets to call home.
  Create a function that returns an array of colonisers that will stay, according to the above rules.
  NOTE: don't include any element that is not a "family".
*/

function colonisers(arr) {
  let selectedFamilies = [];

  arr.forEach((element) => {
    if (element.includes("family") && element.charAt(0) === "A") {
      selectedFamilies.push(element);
    }
  });

  return selectedFamilies;
}

/* ======= TESTS - DO NOT MODIFY ===== */

const voyagers = [
  "Adam family",
  "Potter family",
  "Eric",
  "Aldous",
  "Button family",
  "Jude",
  "Carmichael",
  "Bunny",
  "Asimov",
  "Oscar family",
  "Avery family",
  "Archer family",
];

const util = require("util");

function test(test_name, actual, expected) {
  let status;
  if (util.isDeepStrictEqual(actual, expected)) {
    status = "PASSED";
  } else {
    status = `FAILED: expected: ${util.inspect(
      expected
    )} but your function returned: ${util.inspect(actual)}`;
  }

  console.log(`${test_name}: ${status}`);
}

test("colonisers function works", colonisers(voyagers), [
  "Adam family",
  "Avery family",
  "Archer family",
]);

// https://github.com/Migracode-Barcelona/exercises-js1/blob/master/week-3/Extra/3-space-colonies.js
