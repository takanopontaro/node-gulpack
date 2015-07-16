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
    };
  }

  static task(conf) {
    let ins = super.task(conf);
    let {name, preTasks, glob, dest, options} = ins.conf;
    gulp.task(name, preTasks, () => {
      return gulp.src(glob)
        .pipe($.plumber({errorHandler: ins.plumberHandler(name)}))
        .pipe($.svgSprite(options))
        .pipe(gulp.dest(dest));
    });
    return ins;
  }
}


/*
let options = {
  shape: {
    dimension: {
      maxWidth: 32,
      maxHeight: 32,
    },
    spacing: {
      padding: 10,
    },
    id: {
      generator: 'svg-',
    },
  },
  mode: {
    css: {
      dest: '..', // based on gulp.dest
      sprite: './www/img/sprite.svg',
      common: 'i',
      prefix: 'i-%s',
      dimensions: '-dims',
      bust: false,
      render: {
        scss: { // based on mode.css.dest
          template: './src/tmpl/svgsprite.scss.hbs',
          dest: './src/css/_svgsprite.scss',
        },
      },
    },
    symbol: {
      inline: true,
      dest: '..', // based on gulp.dest
      sprite: './www/img/sprite.svg', // based on mode.symbol.dest
    },
  },
};
*/
