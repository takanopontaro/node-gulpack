import gulp from 'gulp';

let $ = require('gulp-load-plugins')();


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      dest: null,
      extension: '.html',
      options: {},
    };
    this.useCache = true;
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, glob, dest, extension, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.if(ins.useCache, $.cached(name)))
        .pipe($.ignore.exclude(/\/_[^\/]+jade$/))
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.jade(options))
        .pipe($.rename(path => {
          path.extname = extension;
        }))
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
