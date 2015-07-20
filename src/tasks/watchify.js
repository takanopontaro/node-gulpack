import watchify from 'watchify';


class Task extends require('./browserify')() {

  bundleConf() {
    return Object.assign({}, watchify.args, super.bundleConf());
  }

  init() {
    super.init();
    this.b = watchify(this.b);
    this.b.on('update', this.rebundle.bind(this));
    return this;
  }
}



export default Task.handler.bind(Task);
