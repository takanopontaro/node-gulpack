import gulp       from 'gulp';
import hrtime     from 'pretty-hrtime';
import source     from 'vinyl-source-stream';
import buffer     from 'vinyl-buffer';
import babelify   from 'babelify';
import browserify from 'browserify';

let $ = require('gulp-load-plugins')();


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      dest: null,
      filename: 'bundle.js',
      entries: [],
      babel: false,
      sourcemap: false,
      uglify: false,
    };
  }

  bundleConf() {
    let {entries, sourcemap} = this.conf;
    return {entries, debug: sourcemap};
  }

  init() {
    this.b = browserify(this.bundleConf());
    return this;
  }

  setTransforms() {
    let {babel} = this.conf;
    if (babel) {
      this.b.transform(babelify.configure(this.toOptions(babel)));
    }
    return this;
  }

  getHandler(context) {
    return function() {
      context.plumberHandler(context.conf.name).apply(this, arguments);
      this.emit('end');
    };
  }

  rebundle() {
    let time = process.hrtime();
    let {dest, filename, sourcemap, uglify} = this.conf;
    let {green, yellow, magenta} = this.colors;
    return this.b.bundle()
      .on('error', this.getHandler(this))
      .pipe(source(filename))
      .pipe(buffer())
      .pipe($.if(sourcemap, $.sourcemaps.init({loadMaps: true})))
      .pipe($.if(sourcemap, $.sourcemaps.write('.')))
      .pipe($.if(!!uglify, $.uglify(this.toOptions(uglify))))
      .pipe(gulp.dest(dest))
      .on('end', () => {
        let elapsed = hrtime(process.hrtime(time));
        this.log(green('[bundle]'), yellow(filename), 'after', magenta(elapsed));
      });
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks} = ins.conf;
    ins.init().setTransforms();
    gulp.task(name, preTasks, () => {
      return ins.rebundle();
    });
    return ins;
  }
}
