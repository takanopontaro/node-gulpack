import del   from 'del';
import gulp  from 'gulp';
import paths from 'vinyl-paths';


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
    };
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, glob} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe(paths(del));
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
