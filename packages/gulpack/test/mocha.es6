import fs from 'fs';
import { fork } from 'child_process';
import del from 'del';


const testRoot = './packages/gulpack';
const tmpDir = `${testRoot}/tmp`;

del.sync(tmpDir);
fs.mkdirSync(tmpDir);

const gulp = fork('./node_modules/gulp/bin/gulp.js', [
  '--no-color', '--silent',
  '--gulpfile', `${testRoot}/test/gulpfile.babel.js`,
  '--cwd', testRoot,
]);

let target; {
  const md = process.argv.pop().match(/--plugin=(.+)/);
  target = md ? md[1] : null;
}

function doTest(plugin, spec, done) {
  if (target && target !== plugin) return;
  gulp.once('message', ok => done(ok ? null : new Error()));
  gulp.send({ act: 'test', plugin, spec });
}

function _describe(plugin, tests) {
  const go = (!target || target === plugin);
  const suite = go ? describe : describe.skip;
  if (go) gulp.send({ act: 'init', plugin });
  suite(plugin, () => {
    tests.forEach(({ spec, desc }) => {
      it(desc, done => doTest(plugin, spec, done));
    });
  });
}

describe('gulpack', function () {
  this.timeout(60000);

  after(() => gulp.kill());

  _describe('copy', [
    { spec: 'test1', desc: 'copied' },
  ]);

  _describe('babel', [
    { spec: 'test1', desc: 'compiled' },
    { spec: 'test2', desc: 'compiled with options' },
    { spec: 'test3', desc: 'compiled with config' },
  ]);

  _describe('jade', [
    { spec: 'test1', desc: 'compiled' },
    { spec: 'test2', desc: 'compiled with options' },
    { spec: 'test3', desc: 'compiled with config' },
  ]);

  _describe('sass', [
    { spec: 'test1', desc: 'compiled' },
    { spec: 'test2', desc: 'compiled with options' },
    { spec: 'test3', desc: 'compiled with config' },
  ]);

  _describe('webpack', [
    { spec: 'test1', desc: 'compiled' },
    { spec: 'test2', desc: 'compiled with options' },
    { spec: 'test3', desc: 'compiled with config' },
  ]);

  _describe('imagemin', [
    { spec: 'test1', desc: 'minified' },
    { spec: 'test2', desc: 'minified with options' },
  ]);

  _describe('csssprite', [
    { spec: 'test1', desc: 'published' },
    { spec: 'test2', desc: 'published with options' },
    { spec: 'test3', desc: 'published with config' },
  ]);

  _describe('series', [
    { spec: 'test1', desc: 'executed' },
  ]);

  _describe('watch', [
    { spec: 'test1', desc: 'executed' },
  ]);

  _describe('concat', [
    { spec: 'test1', desc: 'concatenated' },
    { spec: 'test2', desc: 'concatenated with options' },
    { spec: 'test3', desc: 'concatenated with config' },
  ]);

  _describe('del', [
    { spec: 'test1', desc: 'executed' },
  ]);

  _describe('iconfont', [
    { spec: 'test1', desc: 'published' },
    { spec: 'test2', desc: 'published with options and config' },
  ]);

  _describe('sassimporter', [
    { spec: 'test1', desc: 'published' },
  ]);

  _describe('svgsprite', [
    { spec: 'test1', desc: 'published' },
    { spec: 'test2', desc: 'published with options and config' },
  ]);
});
