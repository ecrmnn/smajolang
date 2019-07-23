'use strict';

const { describe, it } = require('mocha');
const { expect } = require('chai');
const read = require('fs-readdir-recursive');
const fs = require('fs-extra');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const build = async (projectPath) => {
  const { stdout } = await exec(`cd ${projectPath} && node ../../../src/index.js build`);

  return stdout;
};

describe('Test Suite', () => {
  it('should transpile to JS', async () => {
    const projectPath = 'test/projects/working';

    fs.removeSync(`${projectPath}/dist`);

    await build(projectPath);

    const files = read(`${projectPath}/dist`);

    expect(files).to.eql(['ok.js']);
  });

  it('should understand different casing in variable names', async () => {
    const projectPath = 'test/projects/working';

    fs.removeSync(`${projectPath}/dist`);

    await build(projectPath);

    const files = read(`${projectPath}/dist`);

    expect(files).to.eql(['ok.js']);
  });

  it('should transpile recursively to JS', async () => {
    const projectPath = 'test/projects/recursive';

    fs.removeSync(`${projectPath}/dist`);

    await build(projectPath);

    const files = read(`${projectPath}/dist`);

    expect(files).to.eql([
      'main/main.js',
      'misc/logger.js',
      'misc/sub/x.js',
    ]);
  });

  it('should throw an error when no .smajorc file was found', async () => {
    const projectPath = 'test/projects/missing-smajorc';

    try {
      await build(projectPath);
    } catch (error) {
      expect(error.stdout)
        .to.contain('No .smajorc file found. Exiting.');
    }
  });

  it('should throw an error when no variable does not contain smajo', async () => {
    const projectPath = 'test/projects/invalid-file';

    try {
      await build(projectPath);
    } catch (error) {
      expect(error.stdout)
        .to.contain('Invalid variable variableWithoutSmaj0 found in sub/invalid.smajo. Exiting.');
    }
  });
});
