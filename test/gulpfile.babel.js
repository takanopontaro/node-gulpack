import gulp from 'gulp';
import gulpack from '..';


let webserver = gulpack.webserver({
  glob: './dest',
  options: {
    livereload: true,
    open: true,
  },
});

let browsersync = gulpack.browsersync({
  options: {
    server: {
      baseDir: './dest',
      index: 'index.html',
    },
    ghostMode: {
      location: true,
    },
  },
});

let clean = gulpack.clean({
  glob: ['./dest/*', './tmp/*'],
});

let copy = gulpack.copy({
  glob: ['./src/www/.htaccess'],
  dest: './dest',
});

let babel = gulpack.babel({
  glob: ['./src/www/**/*.es6'],
  dest: './tmp',
  options: {loose: ['es6.modules']},
  sourcemap: true,
  uglify: false,
});

let browserify = gulpack.browserify({
  dest: './dest/js',
  entries: ['./src/www/js/main.es6'],
  babel: {loose: ['es6.modules']},
  sourcemap: true,
  uglify: false,
});

let watchify = gulpack.watchify({
  dest: './dest/js',
  entries: ['./src/www/js/main.es6'],
  babel: {loose: ['es6.modules']},
  sourcemap: true,
  uglify: false,
});

let sass = gulpack.sass({
  glob: './src/www/**/*.scss',
  dest: './dest',
  options: {outputStyle: 'expanded', sourceMapContents: true},
  sourcemap: true,
  autoprefixer: {browsers: ['last 2 version', 'Android >= 4']},
  watch: {
    callback(instance, vinyl) {
      instance.useCache = !/\/?_[^\/]+$/.test(vinyl.path);
      this.run(instance, vinyl);
    },
  },
});

let jade = gulpack.jade({
  glob: './src/www/**/*.jade',
  dest: './dest',
  extension: '.htm',
  options: {basedir: '.', pretty: true},
});

let svgsprite = gulpack.svgsprite({
  glob: './src/assets/svg/**/*.svg',
  dest: './tmp',
  options: {
    shape: {
      id: {
        generator: 'svg-',
      },
    },
    mode: {
      symbol: {
        inline: true,
        dest: '..',
        sprite: './tmp/sprite.svg',
      },
    },
  },
  watch: {
    callback(instance, vinyl) {
      this.runSequence('svgsprite', 'jade');
    },
  },
});

let csssprite = gulpack.csssprite({
  glob: './src/assets/png/**/*.png',
  dest: {
    img: './dest/img',
    css: './tmp/css',
  },
  options: {
    cssTemplate: './src/assets/tmpl/sprite.scss_maps.hbs',
    imgName: 'sprite.png',
    imgPath: '../img/sprite.png',
    cssName: '_sprite.scss',
    cssFormat: 'scss_maps',
    padding: 10,
    cssVarMap: sprite => {
      sprite.name = `i-${sprite.name}`;
    },
  },
});

let imagemin = gulpack.imagemin({
  glob: './src/www/**/*.{jpg,png,gif}',
  dest: './dest',
  options: {
    progressive: true,
    interlaced: true,
    use: [
      require('imagemin-pngquant')({quality: '65-80', speed: 3}),
    ],
  },
});

let iconfont = gulpack.iconfont({
  glob: './src/assets/svg/**/*.svg',
  dest: './dest/fonts',
  options: {
    fontName: 'myfont',
    // appendUnicode: true,
    normalize: true,
    startCodepoint: 0xf500,
  },
  consolidate: {
    fontPath: '../fonts/',
    className: 'if',
  },
  css: {
    tmpl: './src/assets/tmpl/iconfont.scss',
    dest: './tmp/css/_iconfont.scss',
  },
});

gulpack.runsequence({
  name: 'build',
  tasks: ['clean', 'copy', 'svgsprite', 'csssprite', 'iconfont', 'imagemin', 'sass', 'babel', 'browserify', 'jade'],
});

gulpack.watch({
  preTasks: ['build'],
  instances: [sass, jade],
});


gulp.task('default', ['watch']);
