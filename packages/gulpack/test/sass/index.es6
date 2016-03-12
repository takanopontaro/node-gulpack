import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/sass/a.scss';

gulpack.task('sass', {
  name: 'sass1',
  glob,
  dest: './tmp/sass/1',
});

gulpack.task('sass', {
  name: 'sass2',
  glob,
  dest: './tmp/sass/2',
  opts: { indentType: 'tab' },
});

gulpack.task('sass', {
  name: 'sass3',
  glob,
  dest: './tmp/sass/3',
  minify: true,
  autoprefix: { browsers: ['android 4'] },
});

gulp.task('sass:test1', ['sass1'], () => {
  const path = './tmp/sass/1/a.css';
  global._res = util.exists(path);
});

gulp.task('sass:test2', ['sass2'], () => {
  const path = './tmp/sass/2/a.css';
  global._res = util.exists(path) && util.test(path, /\t/);
});

gulp.task('sass:test3', ['sass3'], () => {
  const path = './tmp/sass/3/a.css';
  global._res = util.exists(path) && !util.test(path, /\n/) && util.test(path, /-webkit-/);
});
