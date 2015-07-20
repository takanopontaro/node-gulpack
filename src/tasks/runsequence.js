import gulp     from 'gulp';
import sequence from 'run-sequence';


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      tasks: [],
    };
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, tasks} = ins.conf;
    gulp.task(name, preTasks, cb => {
      sequence(...tasks, cb);
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
