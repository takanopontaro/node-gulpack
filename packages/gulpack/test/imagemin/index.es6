import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';
import pngquant from 'imagemin-pngquant';


const glob = './test/imagemin/a.png';

gulpack.task('imagemin', {
  name: 'imagemin1',
  glob,
  dest: './tmp/imagemin/1',
});

gulpack.task('imagemin', {
  name: 'imagemin2',
  glob,
  dest: './tmp/imagemin/2',
  opts: { use: [pngquant()] },
});

gulp.task('imagemin:test1', ['imagemin1'], () => {
  const path = './tmp/imagemin/1/a.png';
  global._res = util.exists(path) && util.smaller(path, glob);
});

gulp.task('imagemin:test2', ['imagemin2'], () => {
  const path = './tmp/imagemin/2/a.png';
  global._res = util.exists(path) && util.smaller(path, glob);
});
