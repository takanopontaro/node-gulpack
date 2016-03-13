import svgSprite from 'gulp-svg-sprite';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'svgsprite',
      opts: {
        shape: { id: { generator: 'i-%s' } },
        mode: { symbol: { dest: '', sprite: 'sprite.svg' } },
      },
      cache: true,
    });
  }
  get pipes() {
    const { name, dest, opts, cache } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      svgSprite(opts),
      this.gulp.dest(dest),
    ];
  }
}
