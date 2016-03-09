import babel from 'gulp-babel';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'babel',
      opts: {},
      sourcemap: false,
      uglify: false,
    });
  }
  get pipes() {
    const { dest, opts, sourcemap, uglify } = this.conf;
    return [
      this.plumber(),
      this.sourcemap(sourcemap, 'init'),
      babel(opts),
      this.uglify(uglify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
}
