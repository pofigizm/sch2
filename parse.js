const fs = require('fs')
const uuid = require('uuid/v4')

const all = fs
  .readFileSync('./vmsh.html', 'utf8')
  .split('\n')

const tasks = {}
let list = 0
let hard = false

all.forEach((line, ix) => {
  if (line.startsWith('<p') && line.includes('2-4')) {
    list = Number((/(Лист|ЛИСТ)\s(\d+)/g).exec(line)[2])
    hard = false
    return
  }

  if (line.startsWith('<p') && line.includes('5-8')) {
    list = Number((/(Лист|ЛИСТ)\s(\d+)/g).exec(line)[2])
    hard = true
    return
  }

  if (line.startsWith('<li>')) {
    const content = line.slice(4, -6)
    const id = uuid()
    tasks[id] = {
      id,
      list,
      hard,
      content,
    }
    return
  }

  if (line.startsWith('<li style="font-weight: 400;">')) {
    const content = line.slice(30, -6)
    const id = uuid()
    tasks[id] = {
      id,
      list,
      hard,
      content,
    }
    return
  }

})

fs.writeFileSync('./src/tasks.json', JSON.stringify(tasks, null, 2))
