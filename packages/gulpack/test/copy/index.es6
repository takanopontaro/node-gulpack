import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.task('copy', {
  name: 'copy1',
  glob: ['./test/copy/a.txt', './test/copy/b.png'],
  dest: './tmp/copy',
});

gulp.task('copy:test1', ['copy1'], () => {
  global._res = util.existsAll(['./tmp/copy/a.txt', './tmp/copy/b.png']);
});
