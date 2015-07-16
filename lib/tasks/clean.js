import del   from 'del';
import gulp  from 'gulp';
import paths from 'vinyl-paths';


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe(paths(del));
    });
    return ins;
  }
}
