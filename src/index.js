#! /usr/bin/env node

/* eslint-disable no-console */

'use strict';

const program = require('commander');
const read = require('fs-readdir-recursive');
const path = require('path');
const fs = require('fs-extra');
const pckg = require('../package.json');
const File = require('./File');
const RC = require('./RC');

program.version(pckg.version, '-v, --version');

program
  .command('build')
  .description('transpile project to javascript')
  .action(() => {
    const projectRoot = process.cwd();

    const rc = new RC(projectRoot);
    rc.load();

    read(rc.getRootDir())
      .filter(relativeFilePath => relativeFilePath.includes('.smajo'))
      .forEach((relativeFilePath) => {
        const absoluteFilePath = path.join(projectRoot, rc.getRootDir(), relativeFilePath);

        const file = new File(absoluteFilePath);

        if (file.hasValidVariables()) {
          // Create directory path to output file
          const outDirectoryPath = path
            .join(projectRoot, rc.getOutDir(), relativeFilePath)
            .replace(file.getFileName(), '');

          fs.mkdirpSync(outDirectoryPath);

          // Save transpiled file
          file.save(outDirectoryPath);
        }
      });
  });

program.parse(process.argv);
