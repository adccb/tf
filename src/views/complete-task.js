import { Select } from 'enquirer'

import { map } from '../utils'

const formatTaskOption = ({ id, content, labelNames }) =>
  `[${id}]: ${content} | ${labelNames.map(({ name }) => formatLabel(name)).join(' ')}`

const completeTask = async ({ getTasks }) => {
  return getTasks('ALL').then(async allTasks => {
    const projects = Array.from(new Set(map('projectName', allTasks)))
    const projectSelect = new Select({
      name: 'project',
      message: 'we found tasks in these projects. which did you mean?',
      choices: projects,
    })

    const project = await projectSelect.run()
    const tasks = allTasks
      .filter(({ projectName }) => projectName === project)
      .map(formatTaskOption)

    const taskSelect = new Select({
      name: 'task',
      message: `we found these tasks in ${formatProject(project)}. which did you mean?`,
      result: val => Number(val.match(/^\[(?<id>\d+)\]/).groups.id),
      choices: tasks,
    })

    return await taskSelect.run()
  })
}

export default completeTask
