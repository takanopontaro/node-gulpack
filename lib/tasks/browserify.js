'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _prettyHrtime = require('pretty-hrtime');

var _prettyHrtime2 = _interopRequireDefault(_prettyHrtime);

var _vinylSourceStream = require('vinyl-source-stream');

var _vinylSourceStream2 = _interopRequireDefault(_vinylSourceStream);

var _vinylBuffer = require('vinyl-buffer');

var _vinylBuffer2 = _interopRequireDefault(_vinylBuffer);

var _babelify = require('babelify');

var _babelify2 = _interopRequireDefault(_babelify);

var _browserify = require('browserify');

var _browserify2 = _interopRequireDefault(_browserify);

var $ = require('gulp-load-plugins')();

var _default = (function (_require) {
  _inherits(_default, _require);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
    this.conf = {
      preTasks: [],
      dest: null,
      filename: 'bundle.js',
      entries: [],
      babel: false,
      sourcemap: false,
      uglify: false
    };
  }

  _createClass(_default, [{
    key: 'bundleConf',
    value: function bundleConf() {
      var _conf = this.conf;
      var entries = _conf.entries;
      var sourcemap = _conf.sourcemap;

      return { entries: entries, debug: sourcemap };
    }
  }, {
    key: 'init',
    value: function init() {
      this.b = (0, _browserify2['default'])(this.bundleConf());
      return this;
    }
  }, {
    key: 'setTransforms',
    value: function setTransforms() {
      var babel = this.conf.babel;

      if (babel) {
        this.b.transform(_babelify2['default'].configure(this.toOptions(babel)));
      }
      return this;
    }
  }, {
    key: 'getHandler',
    value: function getHandler(context) {
      return function () {
        context.plumberHandler(context.conf.name).apply(this, arguments);
        this.emit('end');
      };
    }
  }, {
    key: 'rebundle',
    value: function rebundle() {
      var _this = this;

      var time = process.hrtime();
      var _conf2 = this.conf;
      var dest = _conf2.dest;
      var filename = _conf2.filename;
      var sourcemap = _conf2.sourcemap;
      var uglify = _conf2.uglify;
      var _colors = this.colors;
      var green = _colors.green;
      var yellow = _colors.yellow;
      var magenta = _colors.magenta;

      return this.b.bundle().on('error', this.getHandler(this)).pipe((0, _vinylSourceStream2['default'])(filename)).pipe((0, _vinylBuffer2['default'])()).pipe($['if'](sourcemap, $.sourcemaps.init({ loadMaps: true }))).pipe($['if'](sourcemap, $.sourcemaps.write('.'))).pipe($['if'](!!uglify, $.uglify(this.toOptions(uglify)))).pipe(_gulp2['default'].dest(dest)).on('end', function () {
        var elapsed = (0, _prettyHrtime2['default'])(process.hrtime(time));
        _this.log(green('[bundle]'), yellow(filename), 'after', magenta(elapsed));
      });
    }
  }], [{
    key: 'task',
    value: function task(conf) {
      var ins = _get(Object.getPrototypeOf(_default), 'task', this).call(this, conf);
      var _ins$conf = ins.conf;
      var name = _ins$conf.name;
      var preTasks = _ins$conf.preTasks;

      ins.init().setTransforms();
      _gulp2['default'].task(name, preTasks, function () {
        return ins.rebundle();
      });
      return ins;
    }
  }]);

  return _default;
})(require('../base'));

exports['default'] = _default;
module.exports = exports['default'];