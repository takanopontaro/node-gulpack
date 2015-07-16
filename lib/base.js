import _ from 'lodash';

let $ = require('gulp-load-plugins')();


export default class {

  constructor() {
    this.log = $.util.log;
    this.colors = $.util.colors;
  }

  plumberHandler(title) {
    return $.notify.onError({
      title: title,
      message: '<%= error.message %>',
    });
  }

  toOptions(options) {
    switch (true) {
      case _.isObject(options):
        return options;
      case _.isBoolean(options):
        return {};
    }
    return {};
  }

  static get defaultTaskName() {
    return this._name;
  }

  static set defaultTaskName(str) {
    this._name = str;
  }

  static task(conf) {
    let ins = new this();
    ins.conf.name = this.defaultTaskName;
    Object.assign(ins.conf, conf);
    return ins;
  }
}
