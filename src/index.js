#!/usr/bin/env node

import yargs from 'yargs'
import helpers from 'yargs/helpers'
import { Select } from 'enquirer'
import prodApi from './api'
import {
  map,
  parse,
  handleTasks,
  handleLabels,
  handleProjects,
  handleSections,
  formatProject,
  formatLabel,
  withDefault,
} from './utils'

const args = yargs(helpers.hideBin(process.argv))
  .command('add [todo]', 'add todo item', {}, argv => {
    if (!Boolean(argv.todo)) {
      yargs.showHelp()
      process.exit()
    }

    argv.todo = [argv.todo, ...argv['_'].slice(1)].join(' ')
  })
  .option('labels', { alias: 'l' })
  .option('projects', { alias: 'p' })
  .option('tasks', { alias: 't' })
  .option('sections', { alias: 's' })
  .option('complete', { alias: 'c' })
  .help().argv

export const main = (
  { todo, labels, sections, tasks, projects, complete }, // yargs options
  {
    putNote,
    getProjects,
    getLabels,
    getSections,
    getTasks,
    toLabelIds,
    toSectionId,
    toProjectId,
  }, // api functions for easy test mocking
) => {
  if (todo) {
    // parse todoist's DSL for familiarity, then create a thing
    const { project, section, label, text, priority } = parse(todo)

    putNote({
      content: text,
      section_id: toSectionId(section),
      labels: toLabelIds(label),
      project_id: toProjectId(project),
      priority,
    })
  } else if (complete) {
    getTasks('ALL').then(async allTasks => {
      const projects = Array.from(new Set(map('projectName', allTasks)))
      const projectSelect = new Select({
        name: 'project',
        message: 'we found tasks in these projects. which did you mean?',
        choices: projects,
      })

      const project = await projectSelect.run()
      const tasks = allTasks
        .filter(({ projectName }) => projectName === project)
        .map(
          ({ id, content, labelNames }) =>
            `[${id}]: ${content} | ${labelNames
              .map(({ name }) => formatLabel(name))
              .join(' ')}`,
        )

      const taskSelect = new Select({
        name: 'task',
        message: `we found these tasks in ${formatProject(project)}. which did you mean?`,
        result: val => val.match(/^\[(?<id>\d+)\]/).groups.id,
        choices: tasks,
      })

      const task = await taskSelect.run()
      console.log({ task })
    })
  } else if (labels) {
    // print labels
    getLabels(withDefault(labels, 'ALL')).then(map('name')).then(handleLabels)
  } else if (projects) {
    // print projects
    getProjects(withDefault(projects, 'ALL')).then(map('name')).then(handleProjects)
  } else if (sections) {
    // print sections
    getSections(withDefault(sections, 'kyruus')).then(map('name')).then(handleSections)
  } else if (tasks) {
    // get all tasks in a project
    getTasks(withDefault(tasks, 'ALL')).then(handleTasks)
  }
}

main(args, prodApi)
