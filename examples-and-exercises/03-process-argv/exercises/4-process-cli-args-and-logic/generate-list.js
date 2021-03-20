"use strict";

/**
 * takes an array of strings and concatenates them into a list
 * will render either a numbered list or a dashed list
 * @param {string[]} arrOfStrings - an array of strings
 * @param {boolean} numberedList - should be numbered or not?
 * @returns {string} the array entries combined into a list
 */
const generateList = (arrOfStrings = [], numberedList = false) => {
  // check if the first argument is an array
  if (!Array.isArray(arrOfStrings)) {
    throw new Error("the first argument must be an array");
  }

  // check if the first arguments contains only strings
  const arrayContainsOnlyStrings = arrOfStrings.every(
    (item) => typeof item === "string"
  );

  if (!arrayContainsOnlyStrings) {
    throw new Error("The first argument must be an array of strings!");
  }

  // check if the second argument is boolean
  // if (typeof numberedList !== "Boolean") {
  //   throw new Error("the second argument must be a boolean ");
  // }

  // combine the items in the array to create a list
  //  if numberedList is true, use numbers (1. 2. 3. )
  //  if numberedList is false, use dashes (- - - )

  if (numberedList === true) {
    for (let i = 0; i < arrOfStrings.length; i++) {
      const orderList = `${i++}. ${arrOfStrings[i]}\n`;
      return orderList;
    }
  } else {
    const unOrderList = arrOfStrings.forEach((item) => `- ${item}\nld`);
    return unOrderList;
  }
};

module.exports = generateList;
