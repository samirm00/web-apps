"use strict";

// write this file

const incrementor = {
  state: {
    value: 0,
    increment: 1,
  },

  count: 0,
  step: 1,
  up: function () {
    this.count += this.step;
    this.state.value = this.count;
    this.state.increment = this.step;
  },

  down: function () {
    this.count -= this.step;
    this.state.value = this.count;
    this.state.increment = this.step;
  },
};

module.exports = incrementor;
