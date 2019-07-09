/* eslint-disable global-require */
export const sprints = [
  {
    id: '1',
    name: 'Sprint 1',
    startDate: '2019-04-14T12:05:44.202Z',
    dueDate: '2019-04-28T12:05:44.202Z',
    projectId: '2',
  },
  {
    id: '2',
    name: 'Sprint 2',
    startDate: '2019-05-01T12:05:44.202Z',
    dueDate: '2019-05-15T12:05:44.202Z',
    projectId: '2',
  },
  {
    id: '3',
    name: 'Sprint 3',
    startDate: '2019-05-15T12:05:44.202Z',
    dueDate: '2019-05-30T12:05:44.202Z',
    projectId: '3',
  },
]
export const sprint = {
  id: '4',
  name: 'Sprint 4',
  startDate: '2019-05-15T12:05:44.202Z',
  dueDate: '2019-05-15T12:05:44.202Z',
  projectId: '2',
}

export const workItems = [
  {
    id: '1',
    name:
      'Provide the BA with the requested files : Graphic Chart, Content, Requirement',
    description: 'This is the task 1',
    completionDate: '2019-05-16T10:01:58.756Z',
    type: 0,
    sprintId: '3',
    state: 0,
  },
  {
    id: '10',
    name:
      'Provide the BA with the requested files : Graphic Chart, Content, Requirement',
    description: 'This is the task 1',
    completionDate: '2019-05-16T10:01:58.756Z',
    type: 1,
    sprintId: '3',
    state: 1,
  },
  {
    id: '100',
    name:
      'Provide the BA with the requested files : Graphic Chart, Content, Requirement',
    description: 'This is the task 1',
    completionDate: '2019-05-16T10:01:58.756Z',
    type: 1,
    sprintId: '3',
    state: 2,
  },
  {
    id: '2',
    name: 'Bug 3',
    description: 'This is the bug 3',
    type: 0,
    sprintId: '1',
    state: 1,
  },
  {
    id: '3',
    name: 'the html assessment is false',
    description: 'the html assessment is false',
    type: 1,
    sprintId: '1',
    state: 2,
  },
  {
    id: '4',
    name: 'Update css assessments',
    description: 'the html assessment is false',
    type: 0,
    sprintId: '3',
    state: 3,
  },
  {
    id: '5',
    name: 'add a chapter to the html skill',
    description: 'add a chapter to the html skill',
    type: 0,
    sprintId: '2',
    state: 3,
  },
]

export const workItem = {
  id: '1000',
  name: 'Task 3',
  description: 'This is the task 3',
  type: 0,
  state: 0,
}
