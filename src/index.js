#! /usr/bin/env node

/* eslint-disable no-console */

'use strict';

const program = require('commander');
const pckg = require('../package.json');
const re = require('regex-matches');
const read = require('fs-readdir-recursive');
const path = require('path');
const fs = require('fs-extra');

program.version(pckg.version, '-v, --version');

program
  .command('build')
  .description('transpile project to javascript')
  .action(() => {
    // Define project root and smajorc path
    const projectRoot = process.cwd();
    const smajorcPath = path.join(projectRoot, '.smajorc');

    // Check if .smajorc file exists
    if (!fs.existsSync(smajorcPath)) {
      console.log('No .smajorc file found. Exiting.');
      process.exit(1);
    }

    // Load .smajorc and @var rootDir and @var outDir
    const { rootDir, outDir } = JSON.parse(fs.readFileSync(smajorcPath, 'utf-8'));

    read(rootDir)
      .filter(relativeFilePath => relativeFilePath.includes('.smajo'))
      .forEach((relativeFilePath) => {
        const parts = relativeFilePath.split('/');
        const fileName = parts[parts.length - 1];
        const absoluteFilePath = path.join(projectRoot, rootDir, relativeFilePath);
        const absoluteDirectoryJS = path.join(projectRoot, outDir, relativeFilePath).replace(fileName, '');
        const absoluteFilePathJS = path.join(projectRoot, outDir, relativeFilePath.replace('.smajo', '.js'));

        const smajoFileContent = fs.readFileSync(absoluteFilePath, 'utf-8');

        // Get variables
        const variables = re(/(var|let|const)\s(\S*)\s?(?==)/g, smajoFileContent)
          .map(match => ({ type: match[1], name: match[2] }));

        const invalidVariable = variables.find(({ name }) => !name.toLowerCase().includes('smajo'));
        if (invalidVariable) {
          console.log(`Invalid variable ${invalidVariable.name} found in ${relativeFilePath}. Exiting.`);
          process.exit(1);
        }

        if (!fs.existsSync(outDir)) {
          fs.mkdirSync(outDir);
        }

        fs.mkdirpSync(absoluteDirectoryJS);
        fs.writeFileSync(absoluteFilePathJS, smajoFileContent);
      });
  });

program.parse(process.argv);
