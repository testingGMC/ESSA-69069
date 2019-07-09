/*
 * Menu Messages
 *
 * This contains all the text for the Menu component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Menu'

export default defineMessages({
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Log out',
  },
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
