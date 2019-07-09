/*
 * TopBar Messages
 *
 * This contains all the text for the TopBar component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.TopBar'

export default defineMessages({
  dashboard: {
    id: `${scope}.dashboard`,
    defaultMessage: 'Dashboard',
  },
  graph: {
    id: `${scope}.graph`,
    defaultMessage: 'Graph',
  },
  issues: {
    id: `${scope}.issues`,
    defaultMessage: 'Issues',
  },
})
