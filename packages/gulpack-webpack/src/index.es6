import webpack from 'webpack-stream';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'webpack',
      opts: {},
      cache: true,
      sourcemap: false,
      minify: false,
    });
  }
  get pipes() {
    const { name, dest, cache, minify } = this.conf;
    const opts = this._.cloneDeep(this.conf.opts);
    let sourcemap = this._.cloneDeep(this.conf.sourcemap);
    if (sourcemap) {
      opts.devtool = 'source-map';
      if (sourcemap === true) sourcemap = { loadMaps: true };
      else sourcemap.loadMaps = true;
    }
    return [
      this.cache(cache, name),
      this.plumber(),
      webpack(opts),
      this.sourcemap(sourcemap, 'init'),
      this.minifyJs(minify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
}
