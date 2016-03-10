import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.init(gulp);

gulpack.task('sass', {
  glob: './test/sass/hoge.scss',
  dest: './tmp/sass/1',
});

gulpack.task('sass', {
  name: 'sass-opts',
  glob: './test/sass/hoge.scss',
  dest: './tmp/sass/2',
  opts: { indentType: 'tab' },
});

gulpack.task('sass', {
  name: 'sass-misc',
  glob: './test/sass/hoge.scss',
  dest: './tmp/sass/3',
  minify: true,
  autoprefix: { browsers: ['android 4'] },
});

gulp.task('default', ['sass', 'sass-opts', 'sass-misc'], () => {
  const test1 = util.exists('./tmp/sass/1/hoge.css');
  const test2 = util.exists('./tmp/sass/2/hoge.css') && util.test('./tmp/sass/2/hoge.css', /\t/);
  const test3 = util.exists('./tmp/sass/3/hoge.css') && !util.test('./tmp/sass/3/hoge.css', /\n/) && util.test('./tmp/sass/3/hoge.css', /-webkit-/);
  util.log(+test1);
  util.log(+test2);
  util.log(+test3);
});
