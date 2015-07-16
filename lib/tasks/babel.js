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
      uglify: false,
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest, options, sourcemap, uglify} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.if(sourcemap, $.sourcemaps.init()))
        .pipe($.babel(options))
        .pipe($.if(sourcemap, $.sourcemaps.write('.')))
        .pipe($.if(!!uglify, $.uglify(ins.toOptions(uglify))))
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}
