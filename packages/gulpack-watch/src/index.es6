import watch from 'gulp-watch';
import runSequence from 'run-sequence';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'watch',
      gulpacks: [],
    });
  }
  getTask() {
    for (const gulpack of this.conf.gulpacks) {
      watch(gulpack.conf.glob, this.run.bind(this, gulpack));
    }
  }
  run({ conf: { name } }, vinyl) {
    const { event, relative } = vinyl;
    this.util.log(`[${event}]`.green, relative.yellow);
    this.setData(name, vinyl);
    runSequence(name);
  }
}
