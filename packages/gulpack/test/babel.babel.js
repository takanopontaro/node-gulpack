import gulp from 'gulp';
import gulpack from 'gulpack';


gulpack.init(gulp);

gulpack.task('babel', {
  glob: './src/index.es6',
  dest: './tmp',
  opts: {},
  sourcemap: false,
  uglify: false,
});

gulp.task('teardown', () => {
  // process.exit('OK');
});

gulp.task('default', ['babel', 'teardown']);
