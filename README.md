#gulpack

Popular gulp-plugins packed as es6-classes for easy-to-use.


##Installation

```shell
npm i -D gulpack
```


##Configuration

###package.json

```json
"devDependencies": {
  "babel": "^5.6.23",
  "babelify": "^6.1.3",
  "browser-sync": "^2.7.13",
  "browserify": "^10.2.6",
  "del": "^1.2.0",
  "gulp": "^3.9.0",
  "gulp-autoprefixer": "^2.3.1",
  "gulp-babel": "^5.1.0",
  "gulp-cached": "^1.1.0",
  "gulp-changed": "^1.2.1",
  "gulp-consolidate": "^0.1.2",
  "gulp-iconfont": "^3.0.2",
  "gulp-if": "^1.2.5",
  "gulp-ignore": "^1.2.1",
  "gulp-imagemin": "^2.3.0",
  "gulp-jade": "^1.0.1",
  "gulp-load-plugins": "^0.10.0",
  "gulp-notify": "^2.2.0",
  "gulp-plumber": "^1.0.1",
  "gulp-rename": "^1.2.2",
  "gulp-sass": "^2.0.4",
  "gulp-sourcemaps": "^1.5.2",
  "gulp-svg-sprite": "^1.2.5",
  "gulp-uglify": "^1.2.0",
  "gulp-util": "^3.0.6",
  "gulp-watch": "^4.3.2",
  "gulp-webserver": "^0.9.1",
  "gulp.spritesmith": "^3.8.2",
  "imagemin-pngquant": "^4.1.2",
  "lodash": "^3.10.0",
  "pretty-hrtime": "^1.0.0",
  "run-sequence": "^1.1.1",
  "vinyl-buffer": "^1.0.0",
  "vinyl-paths": "^1.0.0",
  "vinyl-source-stream": "^1.1.0",
  "watchify": "^3.2.3"
}
```

###gulpfile.babel.js

```js
import gulp from 'gulp';
import gulpack from 'gulpack';


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
```


##Test

```shell
npm test
```

Indeed, this is just checking if it works.
