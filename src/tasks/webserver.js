import gulp from 'gulp';

let $ = require('gulp-load-plugins')();


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      options: {},
    };
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, glob, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.webserver(options));
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
