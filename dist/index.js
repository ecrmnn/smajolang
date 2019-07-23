#! /usr/bin/env node


/* eslint-disable no-console */

'use strict';

var program = require('commander');
var pckg = require('../package.json');
var re = require('regex-matches');
var read = require('fs-readdir-recursive');
var path = require('path');
var fs = require('fs-extra');

program.version(pckg.version, '-v, --version');

program.command('build').description('transpile project to javascript').action(function () {
  // Define project root and smajorc path
  var projectRoot = process.cwd();
  var smajorcPath = path.join(projectRoot, '.smajorc');

  // Check if .smajorc file exists
  if (!fs.existsSync(smajorcPath)) {
    console.log('No .smajorc file found. Exiting.');
    process.exit(1);
  }

  // Load .smajorc and @var rootDir and @var outDir

  var _JSON$parse = JSON.parse(fs.readFileSync(smajorcPath, 'utf-8')),
      rootDir = _JSON$parse.rootDir,
      outDir = _JSON$parse.outDir;

  read(rootDir).filter(function (relativeFilePath) {
    return relativeFilePath.includes('.smajo');
  }).forEach(function (relativeFilePath) {
    var parts = relativeFilePath.split('/');
    var fileName = parts[parts.length - 1];
    var absoluteFilePath = path.join(projectRoot, rootDir, relativeFilePath);
    var absoluteDirectoryJS = path.join(projectRoot, outDir, relativeFilePath).replace(fileName, '');
    var absoluteFilePathJS = path.join(projectRoot, outDir, relativeFilePath.replace('.smajo', '.js'));

    var smajoFileContent = fs.readFileSync(absoluteFilePath, 'utf-8');

    // Get variables
    var variables = re(/(var|let|const)\s(\S*)\s?(?==)/g, smajoFileContent).map(function (match) {
      return { type: match[1], name: match[2] };
    });

    var invalidVariable = variables.find(function (_ref) {
      var name = _ref.name;
      return !name.toLowerCase().includes('smajo');
    });
    if (invalidVariable) {
      console.log('Invalid variable ' + invalidVariable.name + ' found in ' + relativeFilePath + '. Exiting.');
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