import { map, filter } from '../utils'
import { projects, labels, tasks, sections } from './entities'

export const putNote = note => Promise.resolve(note)
export const getProjects = filter => Promise.resolve(filter === 'ALL' ? projects : projects.filter(({ name }) => new RegExp(`^${filter}`).test(name)))
export const getLabels = filter => Promise.resolve(filter === 'ALL' ? labels : labels.filter(({ name }) => new RegExp(`^${filter}`).test(name)))
export const hydrateData = () => Promise.all([getProjects('ALL'), getLabels('ALL')])

export const getSections = projectName =>
  hydrateData().then(([projects]) =>
    Promise.resolve(sections.filter(({ project_id }) => project_id === projects.find(({ name }) => name === projectName).id)),
  )

export const getTasks = projectName =>
  hydrateData().then(([projects, labels]) =>
    Promise.resolve(tasks)
      // if a project name was provided, make sure everything that's returned is in that project
      .then(filter(({ project_id }) => projectName === 'ALL' || project_id === projects.find(({ name }) => name === projectName).id))

      // attach projectName and all that stuff so the frontend has it in text to display
      .then(
        map(task => ({
          ...task,
          projectName: projects.find(({ id }) => id === task.project_id).name,
          labelNames: labels.filter(({ id }) => task.labels.includes(id)),
        })),
      ),
  )

export default {
  putNote,
  getProjects,
  getLabels,
  getSections,
  getTasks,
}
