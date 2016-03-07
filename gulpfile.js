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

gulp.task('default', ['build']);

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

gulp.task('watch', ['build'], function(callback) {
  watch(scripts, function() {
    gulp.start('build');
  });
});
