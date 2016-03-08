import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'copy',
    });
  }
  get pipes() {
    return [
      this.gulp.dest(this.conf.dest),
    ];
  }
}
