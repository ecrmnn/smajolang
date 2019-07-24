'use strict';

/* eslint-disable no-console */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function Process() {
    _classCallCheck(this, Process);
  }

  _createClass(Process, null, [{
    key: 'log',
    value: function log(value) {
      console.log(value);
    }
  }, {
    key: 'exit',
    value: function exit() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var code = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

      if (value !== null) {
        this.log(value);
      }

      process.exit(code);
    }
  }]);

  return Process;
}();