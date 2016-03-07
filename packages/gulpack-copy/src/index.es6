import Base from 'gulpack-base';
import gulp from 'gulp';


export default class extends Base {

  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'copy',
    });
  }

  get pipes() {
    let c = this.conf;
    return [
      gulp.dest(c.dest),
    ];
  }

};
