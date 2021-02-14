import chalk from 'chalk'

// extreme basic fp utilities
export const map = fn => coll => (typeof fn === 'string' ? coll.map(i => i[fn]) : coll.map(fn))
export const filter = fn => coll => coll.filter(fn)
export const or = (...predicates) => string => predicates.reduce((retVal, pred) => retVal || pred(string), false)
export const split = (coll, pred) => coll.reduce(([t, f], itm) => (pred(itm) ? [t.concat(itm), f] : [t, f.concat(itm)]), [[], []])
export const withDefault = (value, def) => (typeof value === 'boolean' ? def : value)

// input parsing utilities
const startsWith = marker => string => string[0] === marker
const isProject = startsWith('#')
const isSection = startsWith('/')
const isLabel = startsWith('@')

export const parse = rawText => {
  const [tags, text] = split(rawText.split(' '), or(isProject, isSection, isLabel))
  return { tags, text: text.join(' ') }
}

// formatting and display stuff for todoist nouns
const formatAllWith = formatter => data => console.log(data.map(formatter).join('\n'))
const formatLabel = label => chalk.red(`@${label}`)
const formatProject = project => chalk.blue(`#${project}`)
const formatSection = section => chalk.yellow(`/${section}`)
const formatTask = ({ labelNames, content, projectName }) =>
  `- ${chalk.green(content)} from ${formatProject(projectName)} ${labelNames.map(({ name }) => formatLabel(name)).join(' ')}`

export const handleLabels = formatAllWith(formatLabel)
export const handleTasks = formatAllWith(formatTask)
export const handleSections = formatAllWith(formatSection)
export const handleProjects = formatAllWith(formatProject)
