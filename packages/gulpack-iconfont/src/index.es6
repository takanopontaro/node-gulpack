import path from 'path';
import iconfont from 'gulp-iconfont';
import consolidate from 'gulp-consolidate';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'iconfont',
      opts: { fontName: 'icon' },
      cache: true,
      css: {
        tmpl: path.join(__dirname, 'scss.lodash'),
        path: './_iconfont.scss',
        data: { fontPath: './', prefix: 'i-' },
      },
    });
  }
  get pipes() {
    const { name, opts, cache } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      iconfont(opts),
    ];
  }
  getTask(done) {
    const stream = super.getTask();
    const { dest, css } = this.conf;
    const info = path.parse(css.path);
    let count = 2;
    const asyncr = () => (--count === 0) && done();
    stream.on('glyphs', (glyphs, opts) => {
      const data = this._.merge({}, css.data, { glyphs, fontName: opts.fontName });
      this.gulp.src(css.tmpl)
        .pipe(consolidate('lodash', data))
        .pipe(this.rename(info.base))
        .pipe(this.gulp.dest(info.dir))
        .on('finish', asyncr);
    });
    stream.pipe(this.gulp.dest(dest)).on('finish', asyncr);
  }
}
