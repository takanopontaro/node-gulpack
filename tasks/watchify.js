'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _watchify = require('watchify');

var _watchify2 = _interopRequireDefault(_watchify);

var Task = (function (_require) {
  _inherits(Task, _require);

  function Task() {
    _classCallCheck(this, Task);

    _get(Object.getPrototypeOf(Task.prototype), 'constructor', this).apply(this, arguments);
  }

  _createClass(Task, [{
    key: 'bundleConf',
    value: function bundleConf() {
      return Object.assign({}, _watchify2['default'].args, _get(Object.getPrototypeOf(Task.prototype), 'bundleConf', this).call(this));
    }
  }, {
    key: 'init',
    value: function init() {
      _get(Object.getPrototypeOf(Task.prototype), 'init', this).call(this);
      this.b = (0, _watchify2['default'])(this.b);
      this.b.on('update', this.rebundle.bind(this));
      return this;
    }
  }]);

  return Task;
})(require('./browserify')());

exports['default'] = Task.handler.bind(Task);
module.exports = exports['default'];