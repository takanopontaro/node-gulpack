import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = 'test/pug/a.pug';

gulpack.task('pug', {
  name: 'pug1',
  glob,
  dest: 'tmp/pug/1',
  beautify: false,
});

gulpack.task('pug', {
  name: 'pug2',
  glob,
  dest: 'tmp/pug/2',
  opts: { pretty: true },
  beautify: false,
});

gulpack.task('pug', {
  name: 'pug3',
  glob,
  dest: 'tmp/pug/3',
  extension: '.htm',
  encoding: 'sjis',
  minify: true,
  puggy: true,
  datafile: 'test/pug/b.json',
});

gulp.task('pug:test1', ['pug1'], () => {
  const path = './tmp/pug/1/a.html';
  global._res = util.exists(path) && !util.test(path, /\n/);
});

gulp.task('pug:test2', ['pug2'], () => {
  const path = './tmp/pug/2/a.html';
  global._res = util.exists(path) && util.test(path, /\n/);
});

gulp.task('pug:test3', ['pug3'], () => {
  const path = './tmp/pug/3/a.htm';
  global._res = util.exists(path) && !util.test(path, /\n/)
    && util.test(path, /fuga/) && util.encoding(path, 'SHIFT_JIS');
});
