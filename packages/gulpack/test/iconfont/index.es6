import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/iconfont/*.svg';

gulpack.task('iconfont', {
  name: 'iconfont1',
  glob,
  dest: './tmp/iconfont/1',
  css: { path: './tmp/iconfont/1/icon.scss' },
});

gulpack.task('iconfont', {
  name: 'iconfont2',
  glob,
  dest: './tmp/iconfont/2',
  opts: {
    fontName: 'hoge',
    startUnicode: 0xf500,
  },
  css: {
    tmpl: './test/iconfont/c.lodash',
    path: './tmp/iconfont/2/icon.scss',
    data: { prefix: 'fuga' },
  },
});

gulp.task('iconfont:test1', ['iconfont1'], () => {
  const path1 = './tmp/iconfont/1/icon.ttf';
  const path2 = './tmp/iconfont/1/icon.scss';
  global._res = util.exists(path1) && util.exists(path2);
});

gulp.task('iconfont:test2', ['iconfont2'], () => {
  const path1 = './tmp/iconfont/2/hoge.ttf';
  const path2 = './tmp/iconfont/2/icon.scss';
  global._res = util.exists(path1) && util.test(path2, /\\F500/) && util.test(path2, /!fuga!/);
});
