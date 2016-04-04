import gulp from 'gulp';
import gulpack from 'gulpack';
import util from '../util.es6';
import CommonsChunk from 'webpack/lib/optimize/CommonsChunkPlugin';


const glob = './test/webpack/*.es6';
const entry = {
  a: './test/webpack/a.es6',
  b: './test/webpack/b.es6',
};
const output = { filename: '[name].bundle.js' };

gulpack.task('webpack', {
  name: 'webpack1',
  glob,
  dest: './tmp/webpack/1',
  opts: { entry, output },
  commons: true,
});

gulpack.task('webpack', {
  name: 'webpack2',
  glob,
  dest: './tmp/webpack/2',
  opts: {
    entry,
    output,
    module: {
      loaders: [
        {
          test: /\.es\d*$/,
          loader: 'babel',
          query: {
            presets: ['es2015'],
            cacheDirectory: true,
          },
        },
      ],
    },
    plugins: [
      new CommonsChunk({
        filename: 'common.js',
        name: 'common',
      }),
    ],
  },
});

gulpack.task('webpack', {
  name: 'webpack3',
  glob,
  dest: './tmp/webpack/3',
  opts: { entry, output },
  babel: true,
  builtin: {
    'optimize.CommonsChunkPlugin': {
      filename: 'common.js',
      name: 'common',
    },
  },
});

gulp.task('webpack:test1', ['webpack1'], () => {
  const path = './tmp/webpack/1/a.bundle.js';
  global._res = util.exists(path);
});

gulp.task('webpack:test2', ['webpack2'], () => {
  const path1 = './tmp/webpack/2/a.bundle.js';
  const path2 = './tmp/webpack/2/b.bundle.js';
  global._res = util.existsAll([path1, path2]) && !util.test(path1, /\bconst\b/)
    && !util.test(path1, /alert\('c'\)/) && util.exists('./tmp/webpack/2/common.js');
});

gulp.task('webpack:test3', ['webpack3'], () => {
  const path1 = './tmp/webpack/3/a.bundle.js';
  const path2 = './tmp/webpack/3/b.bundle.js';
  global._res = util.existsAll([path1, path2]) && !util.test(path1, /\bconst\b/)
    && !util.test(path1, /alert\('c'\)/) && util.exists('./tmp/webpack/3/common.js');
});
