'use strict';

/* eslint-disable no-console */

const fs = require('fs-extra');
const path = require('path');
const Process = require('./Process');

module.exports = class RC {
  constructor(projectRoot) {
    this.projectRoot = projectRoot;
    this.rcPath = path.join(projectRoot, '.smajorc');
    this.config = {
      rootDir: null,
      outDir: null,
    };
  }

  rcFileExists() {
    return fs.existsSync(this.rcPath);
  }

  load() {
    if (!fs.existsSync(this.rcPath)) {
      Process.exit('No .smajorc file found. Exiting.');
    }

    const smajorc = JSON.parse(fs.readFileSync(this.rcPath, 'utf-8'));

    this.config = smajorc;

    return this;
  }

  getRootDir() {
    return this.config.rootDir;
  }

  getOutDir() {
    return this.config.outDir;
  }
};
