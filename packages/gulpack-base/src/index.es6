import 'colors';
import _ from 'lodash';
import gulp from 'gulp';
import tap from 'gulp-tap';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import hrtime from 'pretty-hrtime';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';
import cached from 'gulp-cached';
import changed from 'gulp-changed';
import ignore from 'gulp-ignore';
import rename from 'gulp-rename';
import iconv from 'iconv-lite';
import series from 'run-sequence';


class Base {
  get defaults() {
    return {
      name: '',
      deps: [],
      onEnd: null,
      glob: '',
      dest: '',
    };
  }
  get pipes() {
    return [];
  }
  constructor(conf) {
    this.conf = _.merge({}, this.defaults, conf);
    gulp.task(this.conf.name, this.getDeps(), this.getTask.bind(this));
  }
  getDeps() {
    const {name, deps} = this.conf;
    if (deps.length === 0) return [];
    const taskName = `deps of ${name}`;
    gulp.task(taskName, done => series(...deps, done));
    return [taskName];
  }
  getTask() {
    const {glob, onEnd} = this.conf;
    let stream = gulp.src(glob);
    for (let pipe of this.pipes) stream = stream.pipe(pipe);
    if (onEnd) stream.on('end', onEnd.bind(this));
    return stream;
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
  optify(opts) {
    switch (true) {
      case _.isPlainObject(opts):
        return opts;
      case _.isBoolean(opts):
        return {};
    }
    return {};
  }
  sourcemap(enabled, method, ...args) {
    return gulpif(enabled, sourcemaps[method](...args));
  }
  uglify(enabled) {
    if (_.isPlainObject(enabled)) return gulpif(true, uglify(enabled));
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
      const enc = _.isFunction(arg) ? arg(file) : arg;
      file.contents = iconv.encode(file.contents.toString(), enc);
    });
  }
}

_.mixin(Base, {_, if: gulpif, changed});

export default Base;
