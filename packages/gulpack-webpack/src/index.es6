import webpack from 'webpack-stream';
import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'webpack',
      opts: {
        output: {
          filename: '[name].js',
        },
        resolve: {
          extensions: ['', '.webpack.js', '.web.js', '.js', '.es', '.es6'],
        },
      },
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
    const sourcemap = this.getSourcemap();
    if (sourcemap) opts.devtool = 'source-map';
    this._.merge(opts, this.getBabel());
    this._.merge(opts, this.getCommons());
    this._.merge(opts, this.getBuiltins());
    return [
      this.cache(cache, name),
      this.plumber(),
      webpack(opts, alt, this.getCb()),
      this.sourcemap(sourcemap, 'init'),
      this.minifyJs(minify),
      this.sourcemap(sourcemap, 'write'),
      this.gulp.dest(dest),
    ];
  }
  getSourcemap() {
    let map = this._.cloneDeep(this.conf.sourcemap);
    if (map) {
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
  getBabel() {
    let { babel } = this.conf;
    const defaults = {
      test: /\.(js|es\d*)$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015'],
        cacheDirectory: true,
      },
    };
    switch (true) {
      case this._.isPlainObject(babel):
      case (babel === true):
        break;
      case (babel === 'loose'):
        defaults.query.presets = ['es2015-loose'];
        babel = true;
        break;
      default:
        return {};
    }
    const opts = this.optify(babel, defaults);
    return { module: { loaders: [opts] } };
  }
  getCommons() {
    const { commons } = this.conf;
    if (!commons) return {};
    const opts = this.optify(commons, {
      filename: 'common.js',
      name: 'common',
    });
    return { plugins: [new CommonsChunk(opts)] };
  }
  getBuiltins() {
    const res = {};
    this._.forEach(this.conf.builtin, (val, key) => {
      const path = key.replace(/\./g, '/');
      const Plugin = require(`webpack/lib/${path}`);
      this._.merge(res, { plugins: [new Plugin(val)] });
    });
    return res;
  }
}
