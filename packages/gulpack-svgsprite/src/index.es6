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
    });
  }
  get pipes() {
    const { dest, opts } = this.conf;
    return [
      this.plumber(),
      svgSprite(opts),
      this.gulp.dest(dest),
    ];
  }
}
