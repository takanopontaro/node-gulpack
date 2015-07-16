import gulp     from 'gulp';
import sequence from 'run-sequence';


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      tasks: [],
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, tasks} = ins.conf;
    gulp.task(name, preTasks, cb => {
      sequence(...tasks, cb);
    });
    return ins;
  }
}
