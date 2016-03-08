import path from 'path';
import gulp from 'gulp';
import gulpack from 'gulpack';
import {expect} from 'chai';




const tmpDir = path.normalize(`${__dirname}/../`);
process.chdir(tmpDir);

// require('child_process').execSync(`rm -rf ${tmpDir}/*`);

gulpack.init(gulp);

gulpack.task('copy', {
  glob: ['./package.json', './src/index.es6'],
  dest: './tmp',
});

describe('[copy]', () => {
  it('should be copied specified files', () => {
    gulp.start('copy');
  });
});
