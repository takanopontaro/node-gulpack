import 'colors';
import path from 'path';
import _ from 'lodash';
import debug from 'gulp-debug';
import util from 'gulp-util';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import minifyHtml from 'gulp-htmlmin';
import minifyCss from 'gulp-clean-css';
import minifyJs from 'gulp-uglify';
import cache from 'gulp-cached';
import runSequence from 'run-sequence';
import through2 from 'through2';
import minimatch from 'minimatch'


const _data = {};

class Base {
  get defaults() {
    return {
      name: '',
      deps: [],
      onEnd: null,
      glob: '',
      dest: '',
      srcOpts: {},
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
  getChangedFile(name) {
    const obj = this.getData('watch');
    return obj ? obj[name] : undefined;
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
    const { glob, onEnd, srcOpts } = this.conf;
    let stream = this.gulp.src(glob, srcOpts);
    for (const pipe of this.pipes) stream = stream.pipe(pipe);
    if (onEnd) stream.on('end', onEnd.bind(this));
    return stream;
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
      write: { dir: '.', opts: {} },
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
    const stream = (arg === true) ? cache(name) : cache(name, arg);
    return gulpif(this.isMatchForce.bind(this), through2.obj(), stream);
  }
  isMatchForce() {
    const { force } = this.conf;
    const file = this.getChangedFile(this.conf.name);
    if (!force || !file) return false;
    const rel = path.relative('.', file.path);
    return force.some(pattern => minimatch(rel, pattern));
  }
}

_.extend(Base.prototype, { util, _, if: gulpif, debug });

export default Base;
