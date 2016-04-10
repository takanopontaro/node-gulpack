import gulp from 'gulp';
import gulpack from 'gulpack';

const data = require('./global.json');

gulpack.init(gulp);

const jade = gulpack.task('jade', {
  glob: ['**/*.jade', '**/*.json'],// TODO: ./で書きたい…
  // force: /(_.*\.jade|\.json)$/,
  // force: ['**/_*.jade', '**/*.json'],
  // force: changed => {
  //   return changed.basename.startsWith('_');
  // },
  // cache: false,
  // exclude: 'd.json',
  // exclude: file => {
  //   console.log(file.relative)
  //   return true;
  // },
  // cache: ['./*.jade', '!./d.json'],
  // exclude: file => {
  //   return file.relative.endsWith('.json');
  // },
  // ignore: ['./d.json'],
  // glob: './*.jade',
  dest: '.',
  datafile: 'd.json',
});

gulpack.task('watch', {
  deps: ['jade'],
  gulpacks: [jade],
});
