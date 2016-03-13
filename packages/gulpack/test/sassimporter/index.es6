import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/sassimporter/*.scss';

gulpack.task('sassimporter', {
  name: 'sassimporter1',
  glob,
  dest: './tmp/sassimporter/1',
  filename: '_module.scss',
});

gulp.task('sassimporter:test1', ['sassimporter1'], () => {
  const path = './tmp/sassimporter/1/_module.scss';
  global._res = util.exists(path);
});
