import path from 'path';
import jade from 'gulp-jade';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'jade',
      opts: { doctype: 'html' },
      extension: '.html',
      encoding: 'utf8',
      cache: true,
      minify: false,
      beautify: true,
      datafile: null,
      onData: file => {
        const rel = path.relative('.', file.path);
        const json = this.getData(this.conf.name);
        return this._.find(json, (val, key) => new RegExp(key).test(rel));
      },
    });
  }
  get pipes() {
    const { name, dest, opts, extension, encoding, cache, minify,
      beautify, datafile, onData } = this.conf;
    return [
      this.cache(cache, name),
      this.plumber(),
      this.if(!!datafile, this.data(onData)),
      jade(opts),
      this.beautify(beautify),
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
