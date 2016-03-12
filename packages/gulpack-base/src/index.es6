import 'colors';
import _ from 'lodash';
import util from 'gulp-util';
import tap from 'gulp-tap';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import hrtime from 'pretty-hrtime';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import minifyHtml from 'gulp-htmlmin';
import minifyCss from 'gulp-clean-css';
import minifyJs from 'gulp-uglify';
import ignore from 'gulp-ignore';
import cache from 'gulp-cached';
import changed from 'gulp-changed';
import newer from 'gulp-newer';
import rename from 'gulp-rename';
import iconv from 'iconv-lite';
import runSequence from 'run-sequence';
import through2 from 'through2';


const _data = {};

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
  constructor(gulp, conf) {
    this.gulp = gulp;
    this.conf = this.getConf(conf);
    gulp.task(this.conf.name, this.getDeps(), this.getTask.bind(this));
  }
  getData(key) {
    if (key === undefined) return _data;
    return _data[key];
  }
  setData(key, val) {
    return (_data[key] = val);
  }
  getConf(conf) {
    return _.merge({}, this.defaults, conf);
  }
  getDeps() {
    const { name, deps } = this.conf;
    if (deps.length === 0) return [];
    const taskName = `deps of ${name}`;
    this.gulp.task(taskName, done => runSequence(...deps, done));
    return [taskName];
  }
  getTask() {
    const { glob, onEnd } = this.conf;
    let stream = this.gulp.src(glob);
    for (const pipe of this.pipes) stream = stream.pipe(pipe);
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
  optify(opts, defaults = {}) {
    switch (true) {
      case _.isPlainObject(opts):
        return opts;
      case _.isBoolean(opts):
        return opts ? defaults : {};
      default:
        return {};
    }
  }
  sourcemap(arg, method) {
    if (!arg) return through2.obj();
    const confs = {
      init: {},
      write: {
        dir: '.',
        opts: {},
      },
    };
    if (_.isPlainObject(arg)) _.merge(confs, arg);
    const conf = confs[method];
    const args = [];
    if (method === 'init') {
      args.push(conf);
    } else {
      if (conf.dir) args.push(conf.dir);
      args.push(conf.opts);
    }
    return sourcemaps[method](...args);
  }
  minifyHtml(arg) {
    if (!arg) return through2.obj();
    if (arg === true) {
      return minifyHtml({
        removeComments: true,
        collapseWhitespace: true,
        minifyJS: true,
        minifyCSS: true,
      });
    }
    return minifyHtml(arg);
  }
  minifyCss(arg) {
    if (!arg) return through2.obj();
    if (arg === true) return minifyCss();
    return minifyCss(arg);
  }
  minifyJs(arg) {
    if (!arg) return through2.obj();
    if (arg === true) return minifyJs();
    return minifyJs(arg);
  }
  cache(arg, name) {
    if (!arg) return through2.obj();
    if (arg === true) return cache(name);
    return cache(name, arg);
  }
  changed(dest, arg) {
    if (!arg) return changed(dest);
    return changed(dest, arg);
  }
  exclude(cond, opts) {
    return ignore.exclude(cond, opts);
  }
  include(cond, opts) {
    return ignore.include(cond, opts);
  }
  encode(arg) {
    return tap(file => {
      const enc = _.isFunction(arg) ? arg(file) : arg;
      file.contents = iconv.encode(file.contents.toString(), enc);
    });
  }
}

_.extend(Base.prototype, { util, _, if: gulpif, newer, rename });

export default Base;
