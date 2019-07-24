#! /usr/bin/env node


/* eslint-disable no-console */

'use strict';

var program = require('commander');
var read = require('fs-readdir-recursive');
var path = require('path');
var fs = require('fs-extra');
var pckg = require('../package.json');
var File = require('./File');
var RC = require('./RC');

program.version(pckg.version, '-v, --version');

program.command('build').description('transpile project to javascript').action(function () {
  var projectRoot = process.cwd();

  var rc = new RC(projectRoot);
  rc.load();

  read(rc.getRootDir()).filter(function (relativeFilePath) {
    return relativeFilePath.includes('.smajo');
  }).forEach(function (relativeFilePath) {
    var absoluteFilePath = path.join(projectRoot, rc.getRootDir(), relativeFilePath);

    var file = new File(absoluteFilePath);

    if (file.hasValidVariables()) {
      // Create directory path to output file
      var outDirectoryPath = path.join(projectRoot, rc.getOutDir(), relativeFilePath).replace(file.getFileName(), '');

      fs.mkdirpSync(outDirectoryPath);

      // Save transpiled file
      file.save(outDirectoryPath);
    }
  });
});

program.parse(process.argv);