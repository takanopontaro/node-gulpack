"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {

  gulp: null,
  plugins: {},

  init: function init(gulp) {
    this.gulp = gulp;
  },
  task: function task(name, conf) {
    var p = this.plugins;
    p[name] = p[name] || require("gulpack-" + name).default;
    return new p[name](this.gulp, conf);
  }
};