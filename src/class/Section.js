/* the section class */

import chalk from 'chalk'

import { random } from '../utils'
import { sections } from '../api/entities'
import { formatAllWith, startsWith } from './util'

export const rand = () => random(sections)

export const formatSection = section => chalk.yellow(`/${section}`)
export const handleSections = formatAllWith(formatSection)
export function isSection(str) {
  return startsWith('/', str)
}

export default { formatSection, handleSections, isSection, rand }
