export const projects = [
  { id: 1, name: 'kyruus' },
  { id: 2, name: 'personal' },
]

export const labels = [
  { id: 3, name: 'people/jess' },
  { id: 4, name: 'people/shira' },
  { id: 5, name: 'people/julian' },
]

export const tasks = [
  {
    id: 6,
    labels: [3, 4],
    content: 'a task',
    project_id: 1,
  },
  {
    id: 10,
    labels: [4],
    content: 'a different work task',
    project_id: 1,
  },
  {
    id: 7,
    labels: [5],
    content: 'a home task',
    project_id: 2,
  },
]

export const sections = [
  {
    id: 8,
    name: 'eng',
    project_id: 1,
  },
  {
    id: 9,
    name: 'meta',
    project_id: 1,
  },
]
