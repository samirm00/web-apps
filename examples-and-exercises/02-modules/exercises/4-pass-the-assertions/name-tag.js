"use strict";

// write this file
class NameTag {
  state = {
    name: "",
    greeting: "",
  };

  constructor(name, greeting) {
    this.state.name = name;
    this.state.greeting = greeting;
  }

  get introduction() {
    return `${this.state.greeting} ${this.state.name}`;
  }

  get name() {
    return this.state.name;
  }

  set name(newName) {
    this.state.name = newName;
  }
}

module.exports = NameTag;
