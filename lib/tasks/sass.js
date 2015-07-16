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
      sourcemap: false,
      autoprefixer: false,
    };
    this.useCache = true;
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest, options, sourcemap, autoprefixer} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.if(ins.useCache, $.cached(name)))
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.if(sourcemap, $.sourcemaps.init()))
        .pipe($.sass(options))
        .pipe($.if(!!autoprefixer, $.autoprefixer(ins.toOptions(autoprefixer))))
        .pipe($.if(sourcemap, $.sourcemaps.write('.')))
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}
