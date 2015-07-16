import gulp from 'gulp';


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      dest: null,
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}
