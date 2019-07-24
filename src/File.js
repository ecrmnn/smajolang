'use strict';

/* eslint-disable no-console */

const re = require('regex-matches');
const fs = require('fs-extra');
const path = require('path');
const Process = require('./Process');

module.exports = class File {
  constructor(filePath) {
    this.filePath = filePath;
    this.content = '';
  }

  load() {
    this.content = fs.readFileSync(this.filePath, 'utf-8');

    return this;
  }

  getFileName() {
    const parts = this.filePath.split('/');

    return parts[parts.length - 1];
  }

  variables() {
    const regex = /(var|let|const)\s(\S*)\s?(?==)/g;

    return re(regex, this.content)
      .map(match => ({
        type: match[1],
        name: match[2],
      }));
  }

  hasValidVariables() {
    const invalidVariable = this.variables().find(({ name }) => (
      !name.toLowerCase().includes('smajo')
    ));

    if (invalidVariable) {
      Process.exit(`Invalid variable ${invalidVariable.name} found in ${this.filePath}. Exiting.`);
    }

    return invalidVariable === undefined;
  }

  save(outDirectoryPath) {
    const outFilename = this.getFileName().replace('.smajo', '.js');

    fs.writeFileSync(path.join(outDirectoryPath, outFilename), this.content);
  }
};

