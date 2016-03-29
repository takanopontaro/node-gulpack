import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';


const glob = './test/csssprite/*.png';

gulpack.task('csssprite', {
  name: 'csssprite1',
  glob,
  dest: './tmp/csssprite/1',
});

gulpack.task('csssprite', {
  name: 'csssprite2',
  glob,
  dest: {
    img: './tmp/csssprite/2/img',
    css: './tmp/csssprite/2/css',
  },
  opts: {
    imgName: 'hoge.png',
    cssName: 'fuga.css',
    cssTemplate: './test/csssprite/c.hbs',
  },
});

gulpack.task('csssprite', {
  name: 'csssprite3',
  glob,
  dest: './tmp/csssprite/3',
  retina: false,
});

gulp.task('csssprite:test1', ['csssprite1'], () => {
  const path = './tmp/csssprite/1/sprite.png';
  global._res = util.exists(path);
});

gulp.task('csssprite:test2', ['csssprite2'], () => {
  const path1 = './tmp/csssprite/2/img/hoge.png';
  const path2 = './tmp/csssprite/2/css/fuga.css';
  global._res = util.existsAll([path1, path2]) && util.test(path2, /OK/);
});

gulp.task('csssprite:test3', ['csssprite3'], () => {
  const path = './tmp/csssprite/3/_csssprite.scss';
  global._res = util.exists(path) && util.test(path, /-40px/);
});
