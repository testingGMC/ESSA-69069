/*
 * WorkItemModal Messages
 *
 * This contains all the text for the WorkItemModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.WorkItemModal'

export default defineMessages({
  addWorkItem: {
    id: `${scope}.addWorkItem`,
    defaultMessage: 'Work Item',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  name: {
    id: `${scope}.name`,
    defaultMessage: 'Name',
  },
  description: {
    id: `${scope}.description`,
    defaultMessage: 'Description',
  },
  task: {
    id: `${scope}.task`,
    defaultMessage: 'Task',
  },
  bug: {
    id: `${scope}.bug`,
    defaultMessage: 'Bug',
  },
  type: {
    id: `${scope}.type`,
    defaultMessage: 'Type',
  },
  completionDate: {
    id: `${scope}.completionDate`,
    defaultMessage: 'Completion Date',
  },
  sprint: {
    id: `${scope}.sprint`,
    defaultMessage: 'Sprint',
  },
  nameError: {
    id: `${scope}.name`,
    defaultMessage: 'Please input the name',
  },
  descriptionError: {
    id: `${scope}.descriptionError`,
    defaultMessage: ' Please input the description',
  },
  typeError: {
    id: `${scope}.typeError`,
    defaultMessage: ' Please input the type',
  },
  completionDateError: {
    id: `${scope}.completionDateError`,
    defaultMessage: ' Please input the completion date',
  },
  sprintError: {
    id: `${scope}.sprintError`,
    defaultMessage: ' Please input the sprint',
  },
  assignTo: {
    id: `${scope}.assignTo`,
    defaultMessage: 'Assign to',
  },
})
