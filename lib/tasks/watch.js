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

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

var $ = require('gulp-load-plugins')();

var _default = (function (_require) {
  _inherits(_default, _require);

  function _default() {
    _classCallCheck(this, _default);

    _get(Object.getPrototypeOf(_default.prototype), 'constructor', this).call(this);
    this.conf = {
      preTasks: [],
      instances: []
    };
  }

  _createClass(_default, [{
    key: 'echo',
    value: function echo(_ref, task) {
      var event = _ref.event;
      var relative = _ref.relative;
      var _colors = this.colors;
      var green = _colors.green;
      var cyan = _colors.cyan;

      this.log(green('[' + event + ']'), '\'' + cyan(task) + '\'', relative);
    }
  }, {
    key: 'run',
    value: function run(instance, vinyl) {
      var name = instance.conf.name;

      this.echo(vinyl, name);
      _gulp2['default'].start([name]);
    }
  }, {
    key: 'runSequence',
    value: function runSequence() {
      _runSequence2['default'].apply(undefined, arguments);
    }
  }], [{
    key: 'task',
    value: function task(conf) {
      var ins = _get(Object.getPrototypeOf(_default), 'task', this).call(this, conf);
      var _ins$conf = ins.conf;
      var name = _ins$conf.name;
      var preTasks = _ins$conf.preTasks;
      var instances = _ins$conf.instances;

      _gulp2['default'].task(name, preTasks, function () {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = instances[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var instance = _step.value;
            var _instance$conf = instance.conf;
            var _name = _instance$conf.name;
            var glob = _instance$conf.glob;
            var watch = _instance$conf.watch;

            var callback = ins.run;
            if (watch) {
              glob = watch.glob || glob;
              callback = watch.callback || callback;
            }
            $.watch(glob, callback.bind(ins, instance));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      });
      return ins;
    }
  }]);

  return _default;
})(require('../base'));

exports['default'] = _default;
module.exports = exports['default'];