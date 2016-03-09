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

gulp.task('default', ['babel', 'babel-opts'], () => {
  util.log(util.exists('./tmp/babel/1/hoge.js') ? 1 : 0);
  util.log(util.test('./tmp/babel/2/hoge.js', /\n/) ? 0 : 1);
});
