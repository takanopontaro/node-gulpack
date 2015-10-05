import _ from 'lodash';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import hrtime from 'pretty-hrtime';
import util from 'gulp-util';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';


export default {

  plugins: {},

  load(plugin, conf) {
    let ps = this.plugins;
    let p = (ps[plugin] = ps[plugin] || require(`gulpack-${plugin}`));
    return new p(conf);
  },

  mixin(target) {
    _.merge(target, this.methods);
  },

  methods: {

    _: _,

    configure(defaults, conf) {
      return _.merge({}, defaults, conf);
    },

    optionify(options) {
      switch (true) {
        case _.isObject(options):
          return options;
        case _.isBoolean(options):
          return {};
      }
      return {};
    },

    hrtimef(elapsed) {
      return [
        util.colors.green(`[${this.name}]`),
        'after',
        util.colors.magenta(elapsed),
      ];
    },

    errorHandler() {
      return notify.onError({
        title: this.name,
        message: '<%= error.message %>',
      });
    },

    plumber(conf = {errorHandler: this.errorHandler()}) {
      return plumber(conf);
    },

    start() {
      this.__hrtime = process.hrtime();
    },

    stop() {
      let elapsed = hrtime(process.hrtime(this.__hrtime));
      util.log(...this.hrtimef(elapsed));
    },

    sourcemaps(enabled, method, options = {}) {
      return gulpif(enabled, sourcemaps[method](options));
    },

    uglify(enabled, options = {}) {
      return gulpif(enabled, uglify(options));
    },

  }

};
