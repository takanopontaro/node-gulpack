/* ported from https://github.com/babel/babel/blob/master/Gulpfile.js */

var plumber = require('gulp-plumber');
var through = require('through2');
var chalk   = require('chalk');
var newer   = require('gulp-newer');
var babel   = require('gulp-babel');
var watch   = require('gulp-watch');
var gutil   = require('gulp-util');
var gulp    = require('gulp');
var path    = require('path');

var scripts = './packages/*/src/**/*.es6';
var copies = ['./packages/*/src/**/*', '!./packages/*/src/**/*.es6'];
var dest = 'packages';

var srcEx, libFragment;

if (path.win32 === path) {
  srcEx = /(packages\\[^\\]+)\\src\\/;
  libFragment = '$1\\dist\\';
}
else {
  srcEx = new RegExp('(packages/[^/]+)/src/');
  libFragment = '$1/dist/';
}

gulp.task('default', ['build', 'copy']);

gulp.task('copy', function() {
  return gulp.src(copies)
    .pipe(through.obj(function(file, enc, callback) {
      file._path = file.path;
      file.path = file.path.replace(srcEx, libFragment);
      callback(null, file);
    }))
    .pipe(gulp.dest(dest));
});

gulp.task('build', function() {
  return gulp.src(scripts)
    .pipe(plumber({
      errorHandler: function(err) {
        gutil.log(err.stack);
      }
    }))
    .pipe(through.obj(function(file, enc, callback) {
      file._path = file.path;
      file.path = file.path.replace(srcEx, libFragment);
      callback(null, file);
    }))
    .pipe(newer(dest))
    .pipe(through.obj(function(file, enc, callback) {
      gutil.log('Compiling', "'" + chalk.cyan(file._path) + "'...");
      callback(null, file);
    }))
    .pipe(babel())
    .pipe(gulp.dest(dest));
});

gulp.task('watch', ['build', 'copy'], function(callback) {
  watch(scripts, function() {
    gulp.start('build');
  });
  watch(copies, function() {
    gulp.start('copy');
  });
});
