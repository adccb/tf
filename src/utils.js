import chalk from 'chalk'

// extreme basic fp utilities
export const map = (fn, coll) =>
  coll
    ? typeof fn === 'string'
      ? coll.map(i => i[fn])
      : coll.map(fn)
    : coll => map(fn, coll)
export const filter = fn => coll => coll.filter(fn)
export const or = (...predicates) => string =>
  predicates.reduce((retVal, pred) => retVal || pred(string), false)
export const split = (coll, pred) =>
  coll.reduce(([t, f], itm) => (pred(itm) ? [t.concat(itm), f] : [t, f.concat(itm)]), [
    [],
    [],
  ])
export const partition = (collection, ...predicates) => {
  return predicates.reduce((toReturn, fn, index) => {
    return { ...toReturn, [fn.name]: collection.filter(fn) }
  }, {})
}
export const withDefault = (value, def) => (typeof value === 'boolean' ? def : value)

// input parsing utilities
const startsWith = (marker, string) => string[0] === marker
const removePunctiation = string => string.slice(1)
function isProject(str) {
  return startsWith('#', str)
}
function isSection(str) {
  return startsWith('/', str)
}
function isLabel(str) {
  return startsWith('@', str)
}
function isPriority(str) {
  return startsWith('!', str)
}
function isText(str) {
  return !isProject(str) && !isSection(str) && !isLabel(str) && !isPriority(str)
}
export const parse = rawText => {
  const {
    isProject: project,
    isSection: section,
    isLabel: label,
    isText: text,
    isPriority: priority,
  } = partition(rawText.split(' '), isProject, isSection, isLabel, isPriority, isText)

  return {
    project: project.map(removePunctiation)[0],
    section: section.map(removePunctiation)[0],
    priority: Number(priority.map(removePunctiation)[0]),
    label: label.map(removePunctiation),
    text: text.join(' '),
  }
}

// formatting and display stuff for todoist nouns
const formatAllWith = formatter => data => console.log(data.map(formatter).join('\n'))
export const formatLabel = label => chalk.red(`@${label}`)
export const formatProject = project => chalk.blue(`#${project}`)
export const formatSection = section => chalk.yellow(`/${section}`)
export const formatTask = ({ labelNames, content, projectName }) =>
  `- ${chalk.green(content)} from ${formatProject(
    projectName,
  )} ${labelNames.map(({ name }) => formatLabel(name)).join(' ')}`

export const handleLabels = formatAllWith(formatLabel)
export const handleTasks = formatAllWith(formatTask)
export const handleSections = formatAllWith(formatSection)
export const handleProjects = formatAllWith(formatProject)
