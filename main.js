'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var dir = __dirname + '/tasks';
var files = _fs2['default'].readdirSync(dir);
var pack = {};

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  var _loop = function () {
    var file = _step.value;

    if (/^_/.test(file)) return 'continue';
    var name = file.replace(/\.js$/, '');
    pack[name] = function (conf) {
      var Task = require(dir + '/' + file)();
      Task.defaultTaskName = name;
      pack[name] = Task.register.bind(Task);
      return Task.register(conf);
    };
  };

  for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var _ret = _loop();

    if (_ret === 'continue') continue;
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

exports['default'] = pack;
module.exports = exports['default'];
