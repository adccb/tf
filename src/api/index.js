import { map, filter } from '../utils'

const projects = [
  { id: 1, name: 'kyruus' },
  { id: 2, name: 'personal' },
]

const labels = [
  { id: 3, name: 'people/jess' },
  { id: 4, name: 'people/shira' },
  { id: 5, name: 'people/julian' },
]

const tasks = [
  {
    labels: [3, 4],
    content: 'a task',
    project_id: 1,
  },
  {
    labels: [5],
    content: 'a home task',
    project_id: 2,
  },
]

export const getProjects = () => Promise.resolve(projects)
export const getLabels = () => Promise.resolve(labels)
export const hydrateData = () => Promise.all([getProjects(), getLabels()])
export const putNote = note => Promise.resolve(note)

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
