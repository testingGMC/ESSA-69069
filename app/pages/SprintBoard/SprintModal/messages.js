/*
 * SprintModal Messages
 *
 * This contains all the text for the SprintModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SprintModal'

export default defineMessages({
  manageSprint: {
    id: `${scope}.manageSprint`,
    defaultMessage: 'Manage Sprint (project period : {startDate} / {dueDate})',
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
    defaultMessage: 'name',
  },

  nameError: {
    id: `${scope}.name`,
    defaultMessage: 'Please input the name',
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
