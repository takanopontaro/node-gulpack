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
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      let data = gulp.src(glob)
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.spritesmith(options));
      data.css.pipe(gulp.dest(dest.css));
      data.img.pipe(gulp.dest(dest.img));
    });
    return ins;
  }
}
