/*
 * ProjectModal Messages
 *
 * This contains all the text for the ProjectModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.ProjectModal'

export default defineMessages({
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  project: {
    id: `${scope}.project`,
    defaultMessage: 'Create/Update Project',
  },
  projectName: {
    id: `${scope}.projectName`,
    defaultMessage: 'Project Name',
  },
  projectNameError: {
    id: `${scope}.ProjectNameError`,
    defaultMessage: 'Please input your name!',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  descriptionError: {
    id: `${scope}.descriptionError`,
    defaultMessage: 'Please input your description!',
  },
  startDate: {
    id: `${scope}.startDate`,
    defaultMessage: 'Start Date',
  },
  startDateError: {
    id: `${scope}.startDateError`,
    defaultMessage: 'Please input your start date!',
  },
  dueDate: {
    id: `${scope}.dueDate`,
    defaultMessage: 'Due Date',
  },
  dueDateError: {
    id: `${scope}.dueDateError`,
    defaultMessage: 'Please input your due date!',
  },
})
