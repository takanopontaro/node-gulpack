import Base from 'gulpack-base';
import gulp from 'gulp';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'copy',
    });
  }
  get pipes() {
    return [
      gulp.dest(this.conf.dest),
    ];
  }
}
