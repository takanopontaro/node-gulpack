import del from 'del';
import Base from 'gulpack-base';


export default class extends Base {
  get defaults() {
    return this._.merge({}, super.defaults, {
      name: 'del',
    });
  }
  getTask() {
    return del(this.conf.glob);
  }
}
