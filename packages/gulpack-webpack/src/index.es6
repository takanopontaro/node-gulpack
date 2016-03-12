import webpack from 'webpack-stream';
import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'webpack',
      opts: { output: { filename: '[name].js' } },
      cache: true,
      sourcemap: false,
      minify: false,
      silent: true,
      babel: false,
      commons: false,
      builtin: {},
      alt: null,
      cb: null,
    });
  }
  get pipes() {
    const { name, dest, cache, minify, alt } = this.conf;
    const opts = this._.cloneDeep(this.conf.opts);
    const sourcemap = this.getSourcemap(opts);
    const cb = this.getCb();
    this.mergeBabel(opts);
    this.mergeCommons(opts);
    this.mergeBuiltins(opts);
    return [
      this.cache(cache, name),
      this.plumber(),
      webpack(opts, alt, cb),
      this.sourcemap(sourcemap, 'init'),
      this.minifyJs(minify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
  getSourcemap(opts) {
    let map = this._.cloneDeep(this.conf.sourcemap);
    if (map) {
      opts.devtool = 'source-map';
      if (map === true) map = { loadMaps: true };
      else map.loadMaps = true;
    }
    return map;
  }
  getCb() {
    // if cb is set, always silent
    const { silent, cb } = this.conf;
    if (cb) return cb;
    return silent ? () => {} : null;
  }
  mergeBabel(opts) {
    const { babel } = this.conf;
    if (babel) {
      const babelOpts = this.optify(babel, {
        test: /\.(?:js|es6)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          cacheDirectory: true,
        },
      });
      this._.merge(opts, { module: { loaders: [babelOpts] } });
    }
  }
  mergeCommons(opts) {
    const { commons } = this.conf;
    if (commons) {
      const commonsOpts = this.optify(commons, {
        filename: 'common.js',
        name: 'common',
      });
      this._.merge(opts, { plugins: [new CommonsChunk(commonsOpts)] });
    }
  }
  mergeBuiltins(opts) {
    this._.forEach(this.conf.builtin, (val, key) => {
      const path = key.replace(/\./g, '/');
      const Plugin = require(`webpack/lib/${path}`);
      this._.merge(opts, { plugins: [new Plugin(val)] });
    });
  }
}
