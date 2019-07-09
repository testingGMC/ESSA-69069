/*
 * AddWorkItem Messages
 *
 * This contains all the text for the AddWorkItem component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.AddWorkItem'

export default defineMessages({
  task: {
    id: `${scope}.task`,
    defaultMessage: 'Task',
  },
  bug: {
    id: `${scope}.bug`,
    defaultMessage: 'Bug',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  add: {
    id: `${scope}.add`,
    defaultMessage: 'Add',
  },
})
