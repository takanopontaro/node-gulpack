import path from 'path';
import jade from 'gulp-jade';
import data from 'gulp-data';
import rename from 'gulp-rename';
import { exclude } from 'gulp-ignore';
import beautify from 'gulp-jsbeautifier';
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
      exclude: ['**/_*.jade', '**/*.json'],
      force: ['**/_*.jade', '**/*.json'],
      onData: file => {
        const rel = path.relative('.', file.path);
        const json = this.getData(this.conf.name);
        const local = this._.find(json, (val, key) => {
          if (key === '*') return false;
          return new RegExp(key).test(rel);
        });
        return this._.merge({}, json['*'], local);
      },
    });
  }
  get pipes() {
    const { name, dest, opts, extension, encoding, cache, minify, beautify: beau,
      datafile, exclude: excl, onData } = this.conf;
    return [
      exclude(excl),
      this.cache(cache, name),
      this.plumber(),
      this.if(!!datafile, data(onData)),
      jade(opts),
      this.if(beau, beautify(this.optify(beau, {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 9999,
        end_with_newline: true,
        wrap_line_length: 0,
        css: {
          selector_separator_newline: true,
        },
        html: {
          extra_liners: [],
        },
      }))),
      this.minifyHtml(minify),
      this.encode(encoding),
      rename({ extname: extension }),
      this.gulp.dest(dest),
    ];
  }
  constructor(gulp, conf) {
    super(gulp, conf);
    this.loadData();
  }
  loadData() {
    const { name, datafile } = this.conf;
    if (datafile) {
      const json = require(path.resolve(datafile));
      this.setData(name, json);
    }
  }
}
