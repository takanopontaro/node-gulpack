import imagemin from 'gulp-imagemin';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'imagemin',
      opts: {},
      cache: true,
    });
  }
  get pipes() {
    const { name, dest, opts, cache } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      // this.changed(dest),
      imagemin(opts),
      this.gulp.dest(dest),
    ];
  }
}
