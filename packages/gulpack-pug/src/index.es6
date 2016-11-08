import fs from 'fs';
import path from 'path';
import through2 from 'through2';
import iconv from 'iconv-lite';
import minimatch from 'minimatch';
import pugNpm from 'pug';
import puggy from 'puggy';
import pug from 'gulp-pug';
import tap from 'gulp-tap';
import data from 'gulp-data';
import rename from 'gulp-rename';
import ignore from 'gulp-ignore';
import prettify from 'gulp-jsbeautifier';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    const conf = this._.merge({}, super.defaults, {
      name: 'pug',
      opts: { doctype: 'html' },
      extension: '.html',
      encoding: 'utf8',
      cache: true,
      minify: false,
      beautify: true,
      datafile: null,
      exclude: false,
      force: false,
      puggy: false,
      onData: file => {
        const rel = path.relative('.', file.path);
        const json = this.getData(this.conf.name);
        const local = this._.find(json, (val, key) => {
          if (key === '') return false;
          return new RegExp(key).test(rel);
        });
        return this._.merge({}, json[''], local);
      },
    });
    if (conf.puggy) {
      puggy.init(pugNpm, conf.opts);
      conf.opts.pug = pugNpm;
    }
    return conf;
  }
  get pipes() {
    const { name, dest, opts, extension, encoding, cache, minify, beautify,
      datafile, onData, exclude } = this.conf;
    return [
      ignore.exclude(file => {
        if (!exclude) return false;
        const rel = path.relative('.', file.path);
        return exclude.some(pattern => minimatch(rel, pattern));
      }),
      this.cache(cache, name),
      this.loadData(),
      this.plumber(),
      this.if(!!datafile, data(onData)),
      pug(opts),
      this.if(beautify, prettify(this.optify(beautify, {
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 9999,
        end_with_newline: true,
        wrap_line_length: 0,
        css: {
          selector_separator_newline: true,
        },
        html: {
          unformatted: ['a', 'abbr', 'b', 'bdi', 'bdo', 'br', 'cite', 'code', 'data',
          'datalist', 'del', 'dfn', 'em', 'i', 'img', 'ins', 'kbd', 'keygen', 'mark',
          'math', 'meter', 'output', 'progress', 'q', 'ruby', 's', 'samp', 'small',
          'span', 'strong', 'sub', 'sup', 'template', 'time', 'u', 'var', 'wbr', 'text',
          'acronym', 'address', 'big', 'ins', 'small', 'strike', 'tt', 'pre'],
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
    this._ctime = {};
  }
  getConf(conf) {
    const conf2 = super.getConf(conf);
    const { datafile } = conf2;
    const params = ['glob', 'exclude', 'force'];
    params.forEach(key => {
      if (conf2[key]) conf2[key] = this._.castArray(conf2[key]);
      if (datafile) conf2[key] = (conf2[key] || []).concat(datafile);
    });
    return conf2;
  }
  loadData() {
    const { name, datafile } = this.conf;
    if (!datafile) return through2.obj();
    const files = this._.castArray(datafile);
    return tap(() => {
      let found = false;
      files.forEach(file => {
        const time = fs.statSync(file).ctime.getTime();
        if (time !== this._ctime[file]) {
          found = true;
          this._ctime[file] = time;
          this.util.log(`gulpack-pug: Reloaded ${file}`);
        }
      });
      if (!found) return;
      const json = {};
      files.forEach(file => {
        const abs = path.resolve(file);
        delete require.cache[abs];
        this._.merge(json, require(abs));
      });
      this.setData(name, json);
    });
  }
  encode(arg) {
    return tap(file => {
      const enc = this._.isFunction(arg) ? arg(file) : arg;
      // eslint-disable-next-line no-param-reassign
      file.contents = iconv.encode(file.contents.toString(), enc);
    });
  }
}
