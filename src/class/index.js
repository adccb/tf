import Label from './Label'
import Priority from './Priority'
import Project from './Project'
import Section from './Section'
import Task from './Task'

import { partition } from '../utils'
import { removePunctiation } from './util'

export const parse = rawText => {
  const {
    isProject: project,
    isSection: section,
    isLabel: label,
    isTask: task,
    isPriority: priority,
  } = partition(
    rawText.split(' '),
    Project.isProject,
    Section.isSection,
    Label.isLabel,
    Priority.isPriority,
    Task.isTask,
  )

  return {
    project: project.map(removePunctiation)[0],
    section: section.map(removePunctiation)[0],
    priority: Number(priority.map(removePunctiation)[0]),
    label: label.map(removePunctiation),
    task: task.join(' '),
  }
}

export { default as Label, isLabel, formatLabel } from './Label'
export { default as Priority, isPriority, formatPriority } from './Priority'
export { default as Project, isProject, formatProject } from './Project'
export { default as Section, isSection, formatSection } from './Section'
export { default as Task, isTask, formatTask } from './Task'
