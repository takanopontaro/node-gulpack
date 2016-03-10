import jade from 'gulp-jade';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'jade',
      opts: { pretty: true },
      extension: '.html',
      encoding: 'utf8',
      cache: true,
      minify: false,
    });
  }
  get pipes() {
    const { name, dest, opts, extension, encoding, cache, minify } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      jade(opts),
      this.minifyHtml(minify),
      this.encode(encoding),
      this.rename(path => {
        path.extname = extension;
      }),
      this.gulp.dest(dest),
    ];
  }
}
