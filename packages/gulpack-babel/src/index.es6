import babel from 'gulp-babel';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'babel',
      opts: {},
      sourcemap: false,
      minify: false,
    });
  }
  get pipes() {
    const { dest, opts, sourcemap, minify } = this.conf;
    return [
      this.plumber(),
      this.sourcemap(sourcemap, 'init'),
      babel(opts),
      this.minifyJs(minify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
}
