import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import tap from 'gulp-tap';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'sassimporter',
      filename: 'classes.scss',
      onEnd: () => {
        const { dest, filename } = this.conf;
        const savePath = path.join(dest, filename);
        const buf = this.paths.map(({ rel }) => `"${rel}"`).join(',');
        mkdirp.sync(dest);
        fs.writeFileSync(savePath, `@import ${buf};`);
      },
      srcOpts: { read: false },
    });
  }
  get pipes() {
    this.paths = [];
    return [
      tap(vinyl => {
        this.paths.push({
          abs: vinyl.path,
          rel: path.relative('.', vinyl.path),
        });
      }),
    ];
  }
}
