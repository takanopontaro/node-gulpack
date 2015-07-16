import fs from 'fs';


let dir = `${__dirname}/tasks`;
let files = fs.readdirSync(dir);
let pack = {};

for (let file of files) {
  if (!file.endsWith('.js')) continue;
  let Task = require(`${dir}/${file}`);
  let name = Task.defaultTaskName = file.replace(/\.js$/, '');
  pack[name] = Task.task.bind(Task);
}

export default pack;
