import fs from 'fs';
import runSequence from 'run-sequence';
import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/watch/a.jade';

const jade = gulpack.task('jade', {
  name: 'watch-a',
  glob,
  dest: './tmp/watch',
});

gulp.task('watch-b', done => {
  let timer1;
  let timer2;
  function finish(res) {
    clearInterval(timer1);
    clearTimeout(timer2);
    global._res = res;
    done();
  }
  timer1 = setInterval(() => util.exists('./tmp/watch/a.html') && finish(true), 10);
  timer2 = setTimeout(() => finish(false), 30000);
  const buf = fs.readFileSync(glob);
  fs.writeFileSync(glob, buf);
});

gulpack.task('watch', {
  name: 'watch1',
  gulpacks: [jade],
});

gulp.task('watch:test1', done => {
  runSequence('watch1', 'watch-b', done);
});
