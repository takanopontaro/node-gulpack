import gulp from 'gulp';
import gulpack from 'gulpack';


gulpack.init(gulp);

gulpack.task('copy', {
  glob: ['./package.json', './src/index.es6'],
  dest: './tmp',
});

gulp.task('teardown', () => {
  // process.exit('OK');
});

gulp.task('default', ['copy', 'teardown']);
