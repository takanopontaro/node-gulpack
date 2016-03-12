import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


let buf = '';

gulp.task('series-a', done => { buf += 'a'; done(); });
gulp.task('series-b', done => { buf += 'b'; done(); });
gulp.task('series-c', done => { buf += 'c'; done(); });
gulp.task('series-d', done => { buf += 'd'; done(); });

const copy = gulpack.task('copy', {
  name: 'series-e',
  glob: './test/series/a.txt',
  dest: './tmp/series',
});

gulpack.task('series', {
  name: 'series1',
  tasks: ['series-a', ['series-c', 'series-d'], 'series-b', copy],
});

gulp.task('series:test1', ['series1'], () => {
  global._res = /^a(?:cd|dc)b$/.test(buf) && util.exists('./tmp/series/a.txt');
});
