import sass from 'gulp-sass';
import Base from 'gulpack-base';
import autoprefixer from 'gulp-autoprefixer';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'sass',
      opts: { outputStyle: 'expanded' },
      cache: true,
      sourcemap: false,
      minify: false,
      autoprefix: false,
    });
  }
  get pipes() {
    const { name, dest, opts, sourcemap, minify, autoprefix } = this.conf;
    let { cache } = this.conf;
    const data = this.getData('watch');
    if (data && data[name].basename.startsWith('_')) cache = false;
    return [
      this.cache(cache, name),
      this.plumber(),
      this.sourcemap(sourcemap, 'init'),
      sass(opts),
      this.if(!!autoprefix, autoprefixer(this.optify(autoprefix))),
      this.minifyCss(minify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
}
