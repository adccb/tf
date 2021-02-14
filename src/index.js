#!/usr/bin/env node

import yargs from 'yargs'
import helpers from 'yargs/helpers'

import prodApi from './api'
import { map, parse, handleTasks, handleLabels, handleProjects, handleSections, withDefault } from './utils'

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
  .help().argv

export const main = ({ todo, labels, sections, tasks, projects }, { putNote, getProjects, getLabels, getSections, getTasks }) => {
  if (todo) {
    // parse todoist's DSL for familiarity
    const { text, tags } = parse(todo)
    putNote(todo)
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
