/*
 * ProjectDetails Messages
 *
 * This contains all the text for the ProjectDetails container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.ProjectDetails'

export default defineMessages({
  projectBoard: {
    id: `${scope}.projectBoard`,
    defaultMessage: 'Project Board',
  },
  startDate: {
    id: `${scope}.startDate`,
    defaultMessage: 'start Date',
  },
  dueDate: {
    id: `${scope}.dueDate`,
    defaultMessage: 'Due Date',
  },
  startDateEndDate: {
    id: `${scope}.startDateEndDate`,
    defaultMessage: ' Start Date {startDate} | Due Date {dueDate}',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: ' { description }',
  },
  projectTitle: {
    id: `${scope}.projectTitle`,
    defaultMessage: 'About the project',
  },
  stats: {
    id: `${scope}.stats`,
    defaultMessage: 'Stats',
  },
  efficiency: {
    id: `${scope}.efficiency`,
    defaultMessage: 'Efficiency',
  },
  progress: {
    id: `${scope}.progress`,
    defaultMessage: 'Progress',
  },
  estimatedProgress: {
    id: `${scope}.estimatedProgress`,
    defaultMessage: 'Estimated Progress',
  },
  teamMember: {
    id: `${scope}.teamMember`,
    defaultMessage: 'Team members',
  },
  addNewMember: {
    id: `${scope}.addNewMember`,
    defaultMessage: 'Add new Member +',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },

  confirmMessage: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure to delete this member?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  numbers: {
    id: `${scope}.numbers`,
    defaultMessage: 'Numbers',
  },
  numberOfTasks: {
    id: `${scope}.numberOfTasks`,
    defaultMessage: 'Number Of Tasks',
  },
  completedTasks: {
    id: `${scope}.completedTasks`,
    defaultMessage: 'Completed Tasks',
  },
  nbOfRemainingDays: {
    id: `${scope}.nbOfRemainingDays`,
    defaultMessage: 'Nb. of remaining days',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Description of Project Details',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Project Details',
  },
})
