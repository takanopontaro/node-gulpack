'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var $ = require('gulp-load-plugins')();

var _default = (function () {
  function _default() {
    _classCallCheck(this, _default);

    this.log = $.util.log;
    this.colors = $.util.colors;
  }

  _createClass(_default, [{
    key: 'plumberHandler',
    value: function plumberHandler(title) {
      return $.notify.onError({
        title: title,
        message: '<%= error.message %>'
      });
    }
  }, {
    key: 'toOptions',
    value: function toOptions(options) {
      switch (true) {
        case _lodash2['default'].isObject(options):
          return options;
        case _lodash2['default'].isBoolean(options):
          return {};
      }
      return {};
    }
  }], [{
    key: 'task',
    value: function task(conf) {
      var ins = new this();
      ins.conf.name = this.defaultTaskName;
      Object.assign(ins.conf, conf);
      return ins;
    }
  }, {
    key: 'defaultTaskName',
    get: function get() {
      return this._name;
    },
    set: function set(str) {
      this._name = str;
    }
  }]);

  return _default;
})();

exports['default'] = _default;
module.exports = exports['default'];