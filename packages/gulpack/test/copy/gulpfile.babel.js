import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.init(gulp);

gulpack.task('copy', {
  glob: ['./test/copy/hoge.txt', './test/copy/fuga.png'],
  dest: './tmp/copy',
});

gulp.task('default', ['copy'], () => {
  util.log(util.existsAll(['./tmp/copy/hoge.txt', './tmp/copy/fuga.png']) ? 1 : 0);
});
