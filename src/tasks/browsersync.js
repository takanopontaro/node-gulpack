import gulp from 'gulp';

let browserSync = require('browser-sync').create();


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      options: {},
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      browserSync.init(options);
    });
    return ins;
  }
}
