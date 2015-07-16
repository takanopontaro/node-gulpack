import gulp from 'gulp';

let $ = require('gulp-load-plugins')();


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      options: {},
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.webserver(options));
    });
    return ins;
  }
}
