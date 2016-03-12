import runSequence from 'run-sequence';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'series',
      tasks: [],
    });
  }
  getTask(done) {
    const tasks = this.parse(this.conf.tasks);
    runSequence(...tasks, done);
  }
  parse(tasks) {
    return tasks.map(obj => {
      switch (true) {
        case this._.isString(obj):
          return obj;
        case this._.isArray(obj):
          return this.parse(obj);
        default:
          return obj.conf.name;
      }
    });
  }
}
