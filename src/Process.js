'use strict';

/* eslint-disable no-console */

module.exports = class Process {
  static log(value) {
    console.log(value);
  }

  static exit(value = null, code = 1) {
    if (value !== null) {
      this.log(value);
    }

    process.exit(code);
  }
};
