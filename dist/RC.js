'use strict';

/* eslint-disable no-console */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var fs = require('fs-extra');
var path = require('path');
var Process = require('./Process');

module.exports = function () {
  function RC(projectRoot) {
    _classCallCheck(this, RC);

    this.projectRoot = projectRoot;
    this.rcPath = path.join(projectRoot, '.smajorc');
    this.config = {
      rootDir: null,
      outDir: null
    };
  }

  _createClass(RC, [{
    key: 'rcFileExists',
    value: function rcFileExists() {
      return fs.existsSync(this.rcPath);
    }
  }, {
    key: 'load',
    value: function load() {
      if (!fs.existsSync(this.rcPath)) {
        Process.exit('No .smajorc file found. Exiting.');
      }

      var smajorc = JSON.parse(fs.readFileSync(this.rcPath, 'utf-8'));

      this.config = smajorc;

      return this;
    }
  }, {
    key: 'getRootDir',
    value: function getRootDir() {
      return this.config.rootDir;
    }
  }, {
    key: 'getOutDir',
    value: function getOutDir() {
      return this.config.outDir;
    }
  }]);

  return RC;
}();