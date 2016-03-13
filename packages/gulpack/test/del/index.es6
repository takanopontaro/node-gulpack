import fs from 'fs';
import runSequence from 'run-sequence';
import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './tmp/hoge.txt';

gulp.task('del-a', done => {
  fs.writeFileSync(glob, 'hoge');
  if (!util.exists(glob)) throw new Error();
  done();
});

gulp.task('del-b', done => {
  global._res = !util.exists(glob);
  done();
});

gulpack.task('del', {
  name: 'del1',
  glob,
});

gulp.task('del:test1', done => {
  runSequence('del-a', 'del1', 'del-b', done);
});
