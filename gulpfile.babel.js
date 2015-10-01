import del from 'del';
import paths from 'vinyl-paths';
import gulp from 'gulp';
import babel from 'gulp-babel';


let glob = {
  del: 'dist/*',
  babel: 'src/**/*.es6',
};

gulp.task('del', () => {
  return gulp.src(glob.del)
    .pipe(paths(del));
});

gulp.task('babel', () => {
  return gulp.src(glob.babel)
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['del', 'babel'], () => {
  gulp.watch(glob.babel, ['babel']);
});

gulp.task('default', ['watch']);
