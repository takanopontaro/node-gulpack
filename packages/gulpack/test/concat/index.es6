import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/concat/*.js';

gulpack.task('concat', {
  name: 'concat1',
  glob,
  dest: './tmp/concat/1',
});

gulpack.task('concat', {
  name: 'concat2',
  glob,
  dest: './tmp/concat/2',
  opts: { path: 'a.js' },
  extra: { newLine: '#' },
});

gulpack.task('concat', {
  name: 'concat3',
  glob,
  dest: './tmp/concat/3',
  opts: { path: 'a.hoge' },
  minify: true,
  minifyExt: { js: /\.hoge$/ },
});

gulp.task('concat:test1', ['concat1'], () => {
  const path = './tmp/concat/1/lib.js';
  global._res = util.exists(path);
});

gulp.task('concat:test2', ['concat2'], () => {
  const path = './tmp/concat/2/a.js';
  global._res = util.exists(path) && util.test(path, /#/);
});

gulp.task('concat:test3', ['concat3'], () => {
  const path = './tmp/concat/3/a.hoge';
  global._res = util.exists(path) && !util.test(path, /\n/);
});
