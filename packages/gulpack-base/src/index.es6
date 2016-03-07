import 'colors';
import _ from 'lodash';
import path from 'path';
import gulp from 'gulp';
import tap from 'gulp-tap';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import hrtime from 'pretty-hrtime';
import util from 'gulp-util';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import ignore from 'gulp-ignore';
import rename from 'gulp-rename';
import iconv from 'iconv-lite';
import series from 'run-sequence';



export default class Base {

  get defaults() {
    return {
      name: 'base',
      deps: [],
      glob: null,
      dest: null,
    };
  }

  get pipes() {
    return [];
  }

  constructor(conf) {
    this.init(conf);
    this.setTask();
  }

  init(conf) {
    return this.conf = _.merge({}, this.defaults, conf);
  }

  buildDeps() {
    let {name, deps} = this.conf;
    if (!deps || deps.length === 0) return [];
    name = `deps of ${name}`;
    gulp.task(name, done => series(...deps, done));
    return [name];
  }

  setTask() {
    let c = this.conf;
    gulp.task(c.name, this.buildDeps(), () => this.task());
  }

  task() {
    let c = this.conf;
    let s = gulp.src(c.glob);
    return this.pipe(s, this.pipes);
  }

  pipe(s, pipes) {
    for (let pipe of pipes) s = s.pipe(pipe);
    return s;
  }

  optify(opts) {
    switch (true) {
      case _.isObject(opts):
        return opts;
      case _.isBoolean(opts):
        return {};
    }
    return {};
  }

  start() {
    this._hrtime = process.hrtime();
  }

  stop() {
    this.hrtime = hrtime(process.hrtime(this._hrtime));
  }

  plumber() {
    return plumber({
      errorHandler: notify.onError({
        title: this.conf.name,
        message: '<%= error.message %>',
      }),
    });
  }

  sourcemap(enabled, method, ...args) {
    return gulpif(enabled, sourcemaps[method](...args));
  }

  uglify(enabled) {
    if (_.isObject(enabled)) return gulpif(true, uglify(enabled));
    return gulpif(enabled, uglify());
  }

  cached(enabled, name) {
    return gulpif(enabled, cached(name));
  }

  exclude(cond, opts) {
    return ignore.exclude(cond, opts);
  }

  include(cond, opts) {
    return ignore.include(cond, opts);
  }

  rename(arg) {
    return rename(arg);
  }

  encode(arg) {
    return tap(file => {
      let enc = _.isFunction(arg) ? arg(file) : arg;
      file.contents = iconv.encode(file.contents.toString(), enc);
    });
  }

};


_.merge(Base.prototype, {_, util, if: gulpif, changed});
