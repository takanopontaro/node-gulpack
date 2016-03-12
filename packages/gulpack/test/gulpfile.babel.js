import gulp from 'gulp';
import gulpack from 'gulpack';
import runSequence from 'run-sequence';


gulpack.init(gulp);

process.on('message', ({ act, plugin, spec }) => {
  switch (act) {
    case 'init':
      require(`./${plugin}/index.es6`);
      break;
    case 'test':
      runSequence(`${plugin}:${spec}`, () => process.send(global._res));
      break;
    default:
  }
});

gulp.task('default', () => gulp.watch('*'));
