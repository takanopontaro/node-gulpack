import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.init(gulp);

gulpack.task('jade', {
  glob: './test/jade/hoge.jade',
  dest: './tmp/jade/1',
});

gulpack.task('jade', {
  name: 'jade-opts',
  glob: './test/jade/hoge.jade',
  dest: './tmp/jade/2',
  opts: { pretty: false },
});

gulpack.task('jade', {
  name: 'jade-misc',
  glob: './test/jade/hoge.jade',
  dest: './tmp/jade/3',
  extension: '.htm',
  encoding: 'sjis',
  minify: true,
});

gulp.task('default', ['jade', 'jade-opts', 'jade-misc'], () => {
  const test1 = util.exists('./tmp/jade/1/hoge.html') && util.test('./tmp/jade/1/hoge.html', /\n/);
  const test2 = util.exists('./tmp/jade/2/hoge.html') && !util.test('./tmp/jade/2/hoge.html', /\n/);
  const test3 = util.exists('./tmp/jade/3/hoge.htm') && !util.test('./tmp/jade/3/hoge.htm', /\n/) && util.encoding('./tmp/jade/3/hoge.htm') === 'SHIFT_JIS';
  util.log(+test1);
  util.log(+test2);
  util.log(+test3);
});
