#!/usr/bin/env node

import yargs from 'yargs'
import helpers from 'yargs/helpers'
import { Select } from 'enquirer'
import prodApi from './api'
import { parse, Label, Project, Task, Section } from './class'
import { map, formatProject, formatLabel, withDefault } from './utils'
import { completeTask } from './views/'

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

export const main = async (
  { todo, labels, sections, tasks, projects, complete }, // yargs options
  {
    putNote,
    completeNote,
    getProjects,
    getLabels,
    getSections,
    getTasks,
    toLabelIds,
    toSectionId,
    toProjectId,
  }, // api functions for easy test mocking
  { completeTask }, // views
) => {
  if (todo) {
    // parse todoist's DSL for familiarity, then create a thing
    const { project, section, label, task, priority } = parse(todo)

    putNote({
      content: task,
      section_id: toSectionId(section),
      labels: toLabelIds(label),
      project_id: toProjectId(project),
      priority,
    })
  } else if (complete) {
    const taskId = await completeTask({ getTasks })
    completeNote(taskId)
  } else if (labels) {
    // print labels
    getLabels(withDefault(labels, 'ALL')).then(map('name')).then(Label.handleLabels)
  } else if (projects) {
    // print projects
    console.log({ p: Project.handleProjects })
    getProjects(withDefault(projects, 'ALL'))
      .then(map('name'))
      .then(Project.handleProjects)
  } else if (sections) {
    // print sections
    getSections(withDefault(sections, 'kyruus'))
      .then(map('name'))
      .then(Section.handleSections)
  } else if (tasks) {
    // get all tasks in a project
    getTasks(withDefault(tasks, 'ALL')).then(Task.handleTasks)
  }
}

main(args, prodApi, { completeTask })
