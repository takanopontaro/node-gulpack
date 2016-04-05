import babel from 'gulp-babel';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'babel',
      opts: { presets: ['es2015'] },
      loose: false,
      sourcemap: false,
      minify: false,
    });
  }
  get pipes() {
    const { dest, opts, loose, sourcemap, minify } = this.conf;
    if (loose) {
      (opts.presets = opts.presets || []).push('es2015-loose');
      this._.pull(opts.presets, 'es2015');
      (opts.plugins = opts.plugins || []).push(
        'transform-es3-member-expression-literals',
        'transform-es3-property-literals'
      );
    }
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
