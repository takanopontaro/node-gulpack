import path from 'path';
import jade from 'gulp-jade';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'jade',
      opts: { pretty: true },
      extension: '.html',
      encoding: 'utf8',
      cache: true,
      minify: false,
      datafile: null,
      onData: file => {
        const rel = path.relative('.', file.path);
        return this.getData(this.conf.name)[rel];
      },
    });
  }
  get pipes() {
    const { name, dest, opts, extension, encoding, cache, minify, datafile, onData } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      this.if(!!datafile, this.data(onData)),
      jade(opts),
      this.minifyHtml(minify),
      this.encode(encoding),
      this.rename({ extname: extension }),
      this.gulp.dest(dest),
    ];
  }
  constructor(gulp, conf) {
    super(gulp, conf);
    const { name, datafile } = this.conf;
    if (datafile) {
      const data = require(path.resolve(datafile));
      this.setData(name, data);
    }
  }
}
