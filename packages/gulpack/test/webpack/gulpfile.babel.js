import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.init(gulp);

gulpack.task('webpack', {
  glob: './test/webpack/hoge.es6',
  dest: './tmp/webpack/1',
  opts: {
    entry: {
      top: './test/webpack/hoge.es6',
    },
    output: {
      filename: '[name].bundle.js',
    },
  },
});

gulp.task('default', ['webpack'], () => {
  util.log(1);
  // const test1 = util.exists('./tmp/webpack/1/top.bundle.js');
  // util.log(+test1);
});
