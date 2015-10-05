'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var _slice = Array.prototype.slice;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _gulpNotify = require('gulp-notify');

var _gulpNotify2 = _interopRequireDefault(_gulpNotify);

var _prettyHrtime = require('pretty-hrtime');

var _prettyHrtime2 = _interopRequireDefault(_prettyHrtime);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _gulpIf = require('gulp-if');

var _gulpIf2 = _interopRequireDefault(_gulpIf);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpUglify = require('gulp-uglify');

var _gulpUglify2 = _interopRequireDefault(_gulpUglify);

exports['default'] = {

  plugins: {},

  load: function load(plugin, conf) {
    var ps = this.plugins;
    var p = ps[plugin] = ps[plugin] || require('gulpack-' + plugin);
    return new p(conf);
  },

  mixin: function mixin(target) {
    _lodash2['default'].merge(target, this.methods);
  },

  methods: {

    _: _lodash2['default'],
    util: _gulpUtil2['default'],

    clone: function clone() {
      return _lodash2['default'].merge.apply(_lodash2['default'], [{}].concat(_slice.call(arguments)));
    },

    optionify: function optionify(options) {
      switch (true) {
        case _lodash2['default'].isObject(options):
          return options;
        case _lodash2['default'].isBoolean(options):
          return {};
      }
      return {};
    },

    hrtimef: function hrtimef(elapsed) {
      return [_gulpUtil2['default'].colors.green('[' + this.conf.name + ']'), 'after', _gulpUtil2['default'].colors.magenta(elapsed)];
    },

    errorHandler: function errorHandler() {
      return _gulpNotify2['default'].onError({
        title: this.conf.name,
        message: '<%= error.message %>'
      });
    },

    plumber: function plumber() {
      var conf = arguments.length <= 0 || arguments[0] === undefined ? { errorHandler: this.errorHandler() } : arguments[0];

      return (0, _gulpPlumber2['default'])(conf);
    },

    start: function start() {
      this.__hrtime = process.hrtime();
    },

    stop: function stop() {
      var elapsed = (0, _prettyHrtime2['default'])(process.hrtime(this.__hrtime));
      _gulpUtil2['default'].log.apply(_gulpUtil2['default'], _toConsumableArray(this.hrtimef(elapsed)));
    },

    sourcemaps: function sourcemaps(enabled, method) {
      var options = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

      return (0, _gulpIf2['default'])(enabled, _gulpSourcemaps2['default'][method](options));
    },

    uglify: function uglify(enabled) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      return (0, _gulpIf2['default'])(enabled, (0, _gulpUglify2['default'])(options));
    }

  }

};
module.exports = exports['default'];