import _ from 'lodash';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import hrtime from 'pretty-hrtime';
import util from 'gulp-util';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import uglify from 'gulp-uglify';


import paths from 'vinyl-paths';


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

    plumber(conf) {
      if (!conf) {
        conf = {
          errorHandler: notify.onError({
            title: this.name,
            message: '<%= error.message %>',
          }),
        };
      }
      return plumber(conf);
    },

    start() {
      this.__hrtime = process.hrtime();
    },

    stop() {
      let elapsed = hrtime(process.hrtime(this.__hrtime));
      util.log(...this.hrtimef(elapsed));
    },

    sourcemap(enabled, method, options) {
      return gulpif(enabled, sourcemaps[method](options));
    },

    uglify(enabled, options = {}) {
      return gulpif(enabled, uglify(options));
    },

  }

};