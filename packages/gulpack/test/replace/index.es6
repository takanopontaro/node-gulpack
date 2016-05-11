import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.task('replace', {
  name: 'replace1',
  glob: './test/replace/a.txt',
  dest: './tmp/concat/1',
  pattern: 'is not',
  replacement: 'is',
});

gulp.task('replace:test1', ['replace1'], () => {
  const path = './tmp/concat/1/a.txt';
  global._res = !util.test(path, /not/);
});
