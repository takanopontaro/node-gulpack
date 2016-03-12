import fs from 'fs';
import jschardet from 'jschardet';


export default {
  exists(path) {
    try {
      const stat = fs.statSync(path);
      return stat.isFile() && stat.size !== 0;
    } catch (e) {
      return false;
    }
  },
  existsAll(paths) {
    return paths.every(path => this.exists(path));
  },
  test(path, re) {
    try {
      const buf = fs.readFileSync(path);
      return re.test(buf);
    } catch (e) {
      return false;
    }
  },
  log(str) {
    process.stdout.write(`${str}\n`);
  },
  smaller(path1, path2) {
    try {
      const stat1 = fs.statSync(path1);
      const stat2 = fs.statSync(path2);
      return stat1.size < stat2.size;
    } catch (e) {
      throw new Error(e);
    }
  },
  encoding(path, enc) {
    try {
      const buf = fs.readFileSync(path);
      return jschardet.detect(buf).encoding === enc;
    } catch (e) {
      return false;
    }
  },
};
