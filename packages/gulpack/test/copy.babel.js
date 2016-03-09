import fs from 'fs';
import gulp from 'gulp';
import gulpack from 'gulpack';


gulpack.init(gulp);

gulpack.task('copy', {
  glob: ['./package.json', './src/index.es6'],
  dest: './tmp',
});

gulp.task('check', () => {
  if (!fs.statSync('./tmp/package.json').isFile() ||
  !fs.statSync('./tmp/index.es6').isFile()) process.exit(1);
});
console.log('==',helper.check,'==')
gulp.task('default', ['copy'], helper.check);
