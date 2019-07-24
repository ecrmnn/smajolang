'use strict';

/* eslint-disable no-console */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var re = require('regex-matches');
var fs = require('fs-extra');
var path = require('path');
var Process = require('./Process');

module.exports = function () {
  function File(filePath) {
    _classCallCheck(this, File);

    this.filePath = filePath;
    this.content = '';
  }

  _createClass(File, [{
    key: 'load',
    value: function load() {
      this.content = fs.readFileSync(this.filePath, 'utf-8');

      return this;
    }
  }, {
    key: 'getFileName',
    value: function getFileName() {
      var parts = this.filePath.split('/');

      return parts[parts.length - 1];
    }
  }, {
    key: 'variables',
    value: function variables() {
      var regex = /(var|let|const)\s(\S*)\s?(?==)/g;

      return re(regex, this.content).map(function (match) {
        return {
          type: match[1],
          name: match[2]
        };
      });
    }
  }, {
    key: 'hasValidVariables',
    value: function hasValidVariables() {
      var invalidVariable = this.variables().find(function (_ref) {
        var name = _ref.name;
        return !name.toLowerCase().includes('smajo');
      });

      if (invalidVariable) {
        Process.exit('Invalid variable ' + invalidVariable.name + ' found in ' + this.filePath + '. Exiting.');
      }

      return invalidVariable === undefined;
    }
  }, {
    key: 'save',
    value: function save(outDirectoryPath) {
      var outFilename = this.getFileName().replace('.smajo', '.js');

      fs.writeFileSync(path.join(outDirectoryPath, outFilename), this.content);
    }
  }]);

  return File;
}();