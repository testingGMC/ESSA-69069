/*
 * Commits Messages
 *
 * This contains all the text for the Commits container.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.containers.Commits'

export default defineMessages({
  commits: {
    id: `${scope}.commits`,
    defaultMessage: 'Commits',
  },
  commitsHistory: {
    id: `${scope}.commitsHistory`,
    defaultMessage: 'commits history',
  },
  helmetDescription: {
    id: `${scope}.helmetDescription`,
    defaultMessage: 'Description of Commits',
  },
  helmetTitle: {
    id: `${scope}.helmetTitle`,
    defaultMessage: 'Commits',
  },
})
