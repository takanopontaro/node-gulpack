import concat from 'gulp-concat';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'concat',
      opts: { path: 'all.js' },
      sourcemap: false,
      minify: false,
      minifyExt: {
        html: /\.s?html?$/,
        css: /\.css$/,
        js: /\.js$/,
      },
      extra: {},
    });
  }
  get pipes() {
    const { dest, opts, sourcemap, minify, minifyExt, extra } = this.conf;
    let minifier;
    switch (true) {
      case minifyExt.css.test(opts.path):
        minifier = this.minifyCss;
        break;
      case minifyExt.js.test(opts.path):
        minifier = this.minifyJs;
        break;
      case minifyExt.html.test(opts.path):
      default:
        minifier = this.minifyHtml;
        break;
    }
    return [
      this.plumber(),
      this.sourcemap(sourcemap, 'init'),
      concat(opts, extra),
      minifier(minify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
}
