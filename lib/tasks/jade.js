import gulp from 'gulp';

let $ = require('gulp-load-plugins')();


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      dest: null,
      options: {},
    };
    this.useCache = true;
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.if(ins.useCache, $.cached(name)))
        .pipe($.ignore.exclude(/\/_[^\/]+jade$/))
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.jade(options))
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}
