import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/jade/a.jade';

gulpack.task('jade', {
  name: 'jade1',
  glob,
  dest: './tmp/jade/1',
});

gulpack.task('jade', {
  name: 'jade2',
  glob,
  dest: './tmp/jade/2',
  opts: { pretty: false },
});

gulpack.task('jade', {
  name: 'jade3',
  glob,
  dest: './tmp/jade/3',
  extension: '.htm',
  encoding: 'sjis',
  minify: true,
  datafile: './test/jade/b.json',
});

gulp.task('jade:test1', ['jade1'], () => {
  const path = './tmp/jade/1/a.html';
  global._res = util.exists(path) && util.test(path, /\n/);
});

gulp.task('jade:test2', ['jade2'], () => {
  const path = './tmp/jade/2/a.html';
  global._res = util.exists(path) && !util.test(path, /\n/);
});

gulp.task('jade:test3', ['jade3'], () => {
  const path = './tmp/jade/3/a.htm';
  global._res = util.exists(path) && !util.test(path, /\n/)
    && util.test(path, /fuga/) && util.encoding(path, 'SHIFT_JIS');
});
