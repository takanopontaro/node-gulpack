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

var $ = require('gulp-load-plugins')();

var _default = (function (_require) {
  _inherits(_default, _require);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
    this.conf = {
      preTasks: [],
      glob: null,
      dest: null,
      options: {}
    };
  }

  _createClass(_default, null, [{
    key: 'task',
    value: function task(conf) {
      var ins = _get(Object.getPrototypeOf(_default), 'task', this).call(this, conf);
      var _ins$conf = ins.conf;
      var name = _ins$conf.name;
      var preTasks = _ins$conf.preTasks;
      var glob = _ins$conf.glob;
      var dest = _ins$conf.dest;
      var options = _ins$conf.options;

      _gulp2['default'].task(name, preTasks, function () {
        return _gulp2['default'].src(glob).pipe($.plumber({ errorHandler: ins.plumberHandler(name) })).pipe($.svgSprite(options)).pipe(_gulp2['default'].dest(dest));
      });
      return ins;
    }
  }]);

  return _default;
})(require('../base'));

exports['default'] = _default;
module.exports = exports['default'];

/*
let options = {
  shape: {
    dimension: {
      maxWidth: 32,
      maxHeight: 32,
    },
    spacing: {
      padding: 10,
    },
    id: {
      generator: 'svg-',
    },
  },
  mode: {
    css: {
      dest: '..', // based on gulp.dest
      sprite: './www/img/sprite.svg',
      common: 'i',
      prefix: 'i-%s',
      dimensions: '-dims',
      bust: false,
      render: {
        scss: { // based on mode.css.dest
          template: './src/tmpl/svgsprite.scss.hbs',
          dest: './src/css/_svgsprite.scss',
        },
      },
    },
    symbol: {
      inline: true,
      dest: '..', // based on gulp.dest
      sprite: './www/img/sprite.svg', // based on mode.symbol.dest
    },
  },
};
*/