import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


gulpack.init(gulp);

gulpack.task('babel', {
  glob: './test/babel/hoge.es6',
  dest: './tmp/babel/1',
});

gulpack.task('babel', {
  name: 'babel-opts',
  glob: './test/babel/hoge.es6',
  dest: './tmp/babel/2',
  opts: { compact: true },
});

gulpack.task('babel', {
  name: 'babel-misc',
  glob: './test/babel/hoge.es6',
  dest: './tmp/babel/3',
  minify: true,
});

gulp.task('default', ['babel', 'babel-opts', 'babel-misc'], () => {
  const test1 = util.exists('./tmp/babel/1/hoge.js');
  const test2 = util.exists('./tmp/babel/2/hoge.js') && !util.test('./tmp/babel/2/hoge.js', /\n/);
  const test3 = util.exists('./tmp/babel/3/hoge.js') && !util.test('./tmp/babel/3/hoge.js', /\n/);
  util.log(+test1);
  util.log(+test2);
  util.log(+test3);
});
