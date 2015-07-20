import fs from 'fs';


let dir = `${__dirname}/tasks`;
let files = fs.readdirSync(dir);
let pack = {};

for (let file of files) {
  if (/^_/.test(file)) continue;
  let name = file.replace(/\.js$/, '');
  pack[name] = (conf) => {
    let Task = require(`${dir}/${file}`)();
    Task.defaultTaskName = name;
    pack[name] = Task.register.bind(Task);
    return Task.register(conf);
  };
}

export default pack;
