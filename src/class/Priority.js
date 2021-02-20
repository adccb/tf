/* the priority class */

import chalk from 'chalk'

import { formatAllWith, startsWith } from './util'

export const rand = () => random([1, 2, 3, 4])

export const formatPriority = priority => chalk.yellow(`!${priority}`)
export const handlePriorities = formatAllWith(formatPriority)
export function isPriority(str) {
  return startsWith('!', str)
}

export default { rand, formatPriority, handlePriorities, isPriority }
