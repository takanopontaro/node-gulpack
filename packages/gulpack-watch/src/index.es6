import watch from 'gulp-watch';
import batch from 'gulp-batch';
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
      watch(gulpack.conf.glob, batch((events, cb) => {
        events.on('data', vinyl => this.run(gulpack, vinyl)).on('end', cb);
      }));
    }
  }
  run({ conf: { name } }, vinyl) {
    const { event, relative } = vinyl;
    this.util.log(`[${event}]`.green, relative.yellow);
    this.setData('watch', vinyl);
    runSequence(name);
  }
}
