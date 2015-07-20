import gulp from 'gulp';
import sequence from 'run-sequence';

let $ = require('gulp-load-plugins')();


class Task extends require('./_base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      instances: [],
    };
  }

  echo({event, relative}, task) {
    let {green, cyan} = this.colors;
    this.log(green(`[${event}]`), `'${cyan(task)}'`, relative);
  }

  run(instance, vinyl) {
    let {name} = instance.conf;
    this.echo(vinyl, name);
    gulp.start([name]);
  }

  runSequence(...tasks) {
    sequence(...tasks);
  }

  static register(conf) {
    let ins = super.register(conf);
    let {name, preTasks, instances} = ins.conf;
    gulp.task(name, preTasks, () => {
      for (let instance of instances) {
        let {name, glob, watch} = instance.conf;
        let callback = ins.run;
        if (watch) {
          glob = watch.glob || glob;
          callback = watch.callback || callback;
        }
        $.watch(glob, callback.bind(ins, instance));
      }
    });
    return ins;
  }
}



export default Task.handler.bind(Task);
