/* the project class */

import chalk from 'chalk'

import { random } from '../utils'
import { projects } from '../api/entities'
import { formatAllWith, startsWith } from './util'

export const rand = () => random(projects)

export const formatProject = project => chalk.blue(`#${project}`)
export const handleProjects = formatAllWith(formatProject)
export function isProject(str) {
  return startsWith('#', str)
}

export default {
  rand,
  formatProject,
  handleProjects,
  isProject,
}
