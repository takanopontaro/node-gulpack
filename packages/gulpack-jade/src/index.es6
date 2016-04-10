import fs from 'fs';
import path from 'path';
import through2 from 'through2';
import jade from 'gulp-jade';
import tap from 'gulp-tap';
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
      exclude: false,
      force: false,
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
      datafile, onData } = this.conf;
    if (datafile) {
      ['glob', 'exclude', 'force'].forEach(key => {
        this.conf[key] = this._.castArray(this.conf[key] || []).concat(datafile);
      });
    }
    return [
      this.loadData(),
      exclude(this.conf.exclude),
      this.cache(cache, name),
      // this.debug(),
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
  loadData() {
    const { name, datafile } = this.conf;
    if (!datafile) return through2.obj();
    return tap(() => {
      const time = fs.statSync(datafile).ctime.getTime();
      if (time !== this._ctime) {
        const json = require(path.resolve(datafile));
        this.setData(name, json);
        this._ctime = time;
        this.util.log(`gulpack-jade: Reloaded ${datafile}`);
      }
    });
  }
}
