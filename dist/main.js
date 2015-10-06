"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = {

  plugins: {},

  task: function task(name, conf) {
    var p = this.plugins;
    return new (p[name] = p[name] || require("gulpack-" + name))(conf);
  }

};
module.exports = exports["default"];