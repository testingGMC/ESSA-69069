/*
 * SelectTree Messages
 *
 * This contains all the text for the SelectTree component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.SelectTree'

export default defineMessages({
  confirmMessage: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure you want to delete this node',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'Validate',
  },
  duplicatedTitleMessage: {
    id: `${scope}.title`,
    defaultMessage: 'You cannot use the same title twice',
  },
  duplicatedTitleDescription: {
    id: `${scope}.description`,
    defaultMessage: 'Every node must have a unique title',
  },
})
