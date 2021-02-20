/* the task class */

import chalk from 'chalk'

import { random } from '../utils'
import { tasks } from '../api/entities'
import { formatAllWith } from './util'

import { isProject, isSection, isLabel, isPriority, formatLabel, formatProject } from './'
export const getTask = () => random(tasks)

export function isTask(str) {
  return !isProject(str) && !isSection(str) && !isLabel(str) && !isPriority(str)
}

export const formatTask = ({ labelNames, content, projectName }) =>
  `- ${chalk.green(content)} from ${formatProject(
    projectName,
  )} ${labelNames.map(({ name }) => formatLabel(name)).join(' ')}`

export const handleTasks = formatAllWith(formatTask)

export default {
  getTask,
  isTask,
  formatTask,
  handleTasks,
}
