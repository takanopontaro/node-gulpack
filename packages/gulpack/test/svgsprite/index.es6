import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/svgsprite/*.svg';

gulpack.task('svgsprite', {
  name: 'svgsprite1',
  glob,
  dest: './tmp/svgsprite/1',
});

gulpack.task('svgsprite', {
  name: 'svgsprite2',
  glob,
  dest: './tmp/svgsprite/2',
  opts: {
    shape: { id: { generator: 'hoge-%s' } },
    mode: { symbol: { dest: '', sprite: 'hoge.svg' } },
  },
});

gulp.task('svgsprite:test1', ['svgsprite1'], () => {
  const path = './tmp/svgsprite/1/sprite.svg';
  global._res = util.exists(path);
});

gulp.task('svgsprite:test2', ['svgsprite2'], () => {
  const path = './tmp/svgsprite/2/hoge.svg';
  global._res = util.exists(path) && util.test(path, /hoge/);
});
