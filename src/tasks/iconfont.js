import path from 'path';
import gulp from 'gulp';

let $ = require('gulp-load-plugins')();


export default class extends require('../base') {

  constructor() {
    super();
    this.conf = {
      preTasks: [],
      glob: null,
      dest: null,
      options: {},
      consolidate: {},
      css: {},
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest, options, consolidate, css} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.iconfont(options))
        .on('glyphs', (glyphs, options) => {
          let info = path.parse(css.dest);
          Object.assign(consolidate, {
            glyphs: glyphs,
            fontName: options.fontName,
          });
          gulp.src(css.tmpl)
            .pipe($.consolidate('lodash', consolidate))
            .pipe($.rename({basename: info.name}))
            .pipe(gulp.dest(info.dir));
        })
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}
