import gulp from 'gulp';

let browserSync = require('browser-sync').create();


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      options: {},
    };
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      browserSync.init(options);
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
