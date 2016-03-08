export default {

  gulp: null,
  plugins: {},

  init(gulp) {
    this.gulp = gulp;
  },

  task(name, conf) {
    const p = this.plugins;
    p[name] = p[name] || require(`gulpack-${name}`).default;
    return new p[name](this.gulp, conf);
  },

};
