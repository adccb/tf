#!/usr/bin/env node

import yargs from 'yargs'
import helpers from 'yargs/helpers'

import { putNote, getProjects, getLabels, getTasks } from './api'
import { map, parse, handleTasks, handleLabels, handleProjects, handleNote } from './utils'

const args = yargs(helpers.hideBin(process.argv))
  .command('add [todo]', 'add todo item', {}, argv => {
    if (!Boolean(argv.todo)) {
      yargs.showHelp(), process.exit()
    }
  })
  .command('tasks [project]', 'list items in a project', { project: { default: 'ALL' } })
  .option('labels', { alias: 'l' })
  .option('projects', { alias: 'p' })
  .help().argv

export const main = ({ todo, labels, project, projects }) => {
  if (todo) {
    putNote(todo).then(handleNote)
  } else if (labels) {
    getLabels().then(map('name')).then(handleLabels)
  } else if (projects) {
    getProjects().then(map('name')).then(handleProjects)
  } else if (project) {
    getTasks(project).then(handleTasks)
  }
}

main(args)
