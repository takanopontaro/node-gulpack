import replace from 'gulp-replace';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'replace',
      opts: {},
      pattern: null,
      replacement: null,
    });
  }
  get pipes() {
    const { dest, opts, pattern, replacement } = this.conf;
    return [
      this.plumber(),
      replace(pattern, replacement, opts),
      this.gulp.dest(dest),
    ];
  }
}
