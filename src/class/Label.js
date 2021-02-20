/* the label class */

import chalk from 'chalk'

import { random } from '../utils'
import { labels } from '../api/entities'
import { formatAllWith, startsWith } from './util'

export const rand = () => random(labels)

export const formatLabel = label => chalk.red(`@${label}`)
export const handleLabels = formatAllWith(formatLabel)
export function isLabel(str) {
  return startsWith('@', str)
}

export default { rand, formatLabel, handleLabels, isLabel }
