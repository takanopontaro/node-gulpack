import path from 'path';
import spritesmith from 'gulp.spritesmith';
import merge from 'merge-stream';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'csssprite',
      opts: {
        imgName: 'sprite.png',
        cssName: 'sprite.scss',
        cssTemplate: path.join(__dirname, 'scss@2x.hbs'),
        cssHandlebarsHelpers: { half(num) { return num / 2; } },
      },
      cache: true,
      retina: true,
    });
  }
  get pipes() {
    const { name, opts, cache } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      spritesmith(opts),
    ];
  }
  getConf(conf) {
    const conf2 = super.getConf(conf);
    const { retina, opts } = conf;
    if (retina === false && (!opts || !opts.cssTemplate)) {
      conf2.opts.cssTemplate = conf2.opts.cssTemplate.replace(/@2x\.hbs$/, '.hbs');
    }
    return conf2;
  }
  getTask() {
    const { dest } = this.conf;
    const stream = super.getTask();
    return merge(
      stream.img.pipe(this.gulp.dest(dest.img || dest)),
      stream.css.pipe(this.gulp.dest(dest.css || dest))
    );
  }
}
