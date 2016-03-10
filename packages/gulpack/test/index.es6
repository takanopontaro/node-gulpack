import path from 'path';
import { spawnSync } from 'child_process';
import { expect } from 'chai';
import del from 'del';
import util from './util.es6';


process.chdir(path.normalize(`${__dirname}/../`));

const target = (md => md ? md[1] : null)(process.argv.pop().match(/-p=(.+)/));

function _describe(plugin, cb) {
  const fn = (!target || target === plugin) ? describe : describe.skip;
  fn(`${plugin}`, cb);
}

function run(plugin) {
  if (target && target !== plugin) return [];
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
    it('copied', () => {
      expect(res[0]).to.equal(1);
    });
  });

  _describe('babel', () => {
    const res = run('babel');
    it('compiled', () => {
      expect(res[0]).to.equal(1);
    });
    it('compiled with options', () => {
      expect(res[1]).to.equal(1);
    });
    it('compiled with config', () => {
      expect(res[2]).to.equal(1);
    });
  });

  _describe('jade', () => {
    const res = run('jade');
    it('compiled', () => {
      expect(res[0]).to.equal(1);
    });
    it('compiled with options', () => {
      expect(res[1]).to.equal(1);
    });
    it('compiled with config', () => {
      expect(res[2]).to.equal(1);
    });
  });

  _describe('sass', () => {
    const res = run('sass');
    it('compiled', () => {
      expect(res[0]).to.equal(1);
    });
    it('compiled with options', () => {
      expect(res[1]).to.equal(1);
    });
    it('compiled with config', () => {
      expect(res[2]).to.equal(1);
    });
  });

  _describe('webpack', () => {
    const res = run('webpack');
    it('compiled', () => {
      expect(res[0]).to.equal(1);
    });
  });
});
