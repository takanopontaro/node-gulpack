import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/babel/a.es6';

gulpack.task('babel', {
  name: 'babel1',
  glob,
  dest: './tmp/babel/1',
});

gulpack.task('babel', {
  name: 'babel2',
  glob,
  dest: './tmp/babel/2',
  opts: { compact: true },
});

gulpack.task('babel', {
  name: 'babel3',
  glob,
  dest: './tmp/babel/3',
  minify: true,
});

gulp.task('babel:test1', ['babel1'], () => {
  const path = './tmp/babel/1/a.js';
  global._res = util.exists(path);
});

gulp.task('babel:test2', ['babel2'], () => {
  const path = './tmp/babel/2/a.js';
  global._res = util.exists(path) && !util.test(path, /\n/);
});

gulp.task('babel:test3', ['babel3'], () => {
  const path = './tmp/babel/3/a.js';
  global._res = util.exists(path) && !util.test(path, /\n/);
});
