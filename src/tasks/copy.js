import gulp from 'gulp';


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      dest: null,
    };
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, glob, dest} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
