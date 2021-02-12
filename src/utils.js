import chalk from 'chalk'

export const map = fn => coll => (typeof fn === 'string' ? coll.map(i => i[fn]) : coll.map(fn))
export const filter = fn => coll => coll.filter(fn)

const startsWith = marker => string => string[0] === marker
export const or = (...predicates) => string => predicates.reduce((retVal, pred) => retVal || pred(string), false)
export const split = (coll, pred) => coll.reduce(([t, f], itm) => (pred(itm) ? [t.concat(itm), f] : [t, f.concat(itm)]), [[], []])

const isProject = startsWith('#')
const isSection = startsWith('/')
const isLabel = startsWith('@')

export const parse = rawText => {
  const [tags, text] = split(rawText.split(' '), or(isProject, isSection, isLabel))
  return { tags, text: text.join(' ') }
}

const formatLabel = label => chalk.red(`@${label}`)
const formatProject = project => chalk.blue(`#${project}`)
const formatTask = ({ labelNames, labels, content, projectName }) =>
  `- ${chalk.green(content)} from ${formatProject(projectName)} ${labelNames.map(({ name }) => formatLabel(name)).join(' ')}`

export const handleLabels = labels => console.log(labels.map(formatLabel).join('\n'))
export const handleTasks = tasks => console.log(tasks.map(formatTask).join('\n'))
export const handleProjects = projects => console.log(projects.map(formatProject).join('\n'))
