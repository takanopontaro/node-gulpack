import path from 'path';
import { execSync, spawnSync } from 'child_process';
import { expect } from 'chai';


process.chdir(path.normalize(`${__dirname}/../`));

const gulpBin = './node_modules/gulp/bin/gulp.js';

function getArgs(plugin) {
  return [
    '--no-color', '--silent',
    '--require', './test/helper.es6',
    '--gulpfile', `./test/${plugin}.babel.js`,
    '--cwd', process.cwd(),
  ];
}

const md = process.argv.pop().match(/--plugin=(.+)/);

function _describe(plugin, cb) {
  const fn = (!md || md[1] === plugin) ? describe : describe.skip;
  fn(`[${plugin}]`, cb);
}

function clearTmp() {
  return execSync('rm -rf ./tmp/*');
}

_describe('copy', () => {
  before(clearTmp);
  it('should be copied specified files', () => {
    const res = spawnSync(gulpBin, getArgs('copy'));
    expect(res.status).to.equal(0);
  });
});

_describe('babel', () => {
  before(clearTmp);
  it('should be compiled specified files', () => {
    const res = spawnSync(gulpBin, getArgs('babel'));
    expect(res.status).to.equal(0);
  });
});
