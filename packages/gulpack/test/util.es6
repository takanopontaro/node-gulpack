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
  encoding(path) {
    try {
      const buf = fs.readFileSync(path);
      return jschardet.detect(buf).encoding;
    } catch (e) {
      return null;
    }
  },
};
