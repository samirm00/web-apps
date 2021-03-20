"use strict";

// write this file

const onlyTruthy = function (arr) {
  const truthyArray = [];

  arr.forEach((item) => {
    if (Boolean(item) === true) {
      truthyArray.push(item);
    }
  });

  return truthyArray;
};

module.exports = onlyTruthy;
