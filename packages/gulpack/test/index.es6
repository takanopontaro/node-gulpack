import path from 'path';
import { spawnSync } from 'child_process';
import del from 'del';
import { expect } from 'chai';
import util from './util.es6';


process.chdir(path.normalize(`${__dirname}/../`));

const target = (md => md ? md[1] : null)(process.argv.pop().match(/--plugin=(.+)/));

function _describe(plugin, cb) {
  const fn = (!target || target === plugin) ? describe : describe.skip;
  fn(`${plugin}`, cb);
}

function run(plugin) {
  const args = [
    '--no-color', '--silent',
    '--gulpfile', `./test/${plugin}/gulpfile.babel.js`,
    '--cwd', process.cwd(),
  ];
  util.log(`running ${plugin} ...`);
  return spawnSync('./node_modules/gulp/bin/gulp.js', args)
    .stdout.toString().split(/\n/).slice(0, -1).map(code => +code);
}


describe('gulpack', function () {
  del.sync('./tmp/*');
  this.timeout(10000);

  _describe('copy', () => {
    const res = run('copy');
    it('Files are copied.', () => {
      expect(res[0]).to.equal(1);
    });
  });

  _describe('babel', () => {
    const res = run('babel');
    it('A file are compiled.', () => {
      expect(res[0]).to.equal(1);
    });
    it('A file are compiled with options.', () => {
      expect(res[1]).to.equal(1);
    });
  });
});
