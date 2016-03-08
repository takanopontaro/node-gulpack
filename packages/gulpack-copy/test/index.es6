import gulp from 'gulp';
import gulpack from 'gulpack';

require('child_process').execSync(`rm -rf /Users/takanopontaro/src/github.com/takanopontaro/node-gulpack/packages/gulpack-copy/tmp/*`);

gulpack.task('copy', {
  glob: ['./package.json', './src/index.es6'],
  dest: './tmp',
});

gulp.task('default', ['copy']);


import {expect} from 'chai';

describe('gulpack-copy', () => {
  it('should be copied specified files', () => {
    gulp.run('copy');
  });
});
