export default {

  plugins: {},

  task(name, conf) {
    const p = this.plugins;
    return new (p[name] = p[name] || require(`gulpack-${name}`))(conf);
  },

};
