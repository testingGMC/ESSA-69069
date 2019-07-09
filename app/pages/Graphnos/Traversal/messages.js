/*
 * Simulate Messages
 *
 * This contains all the text for the Simulate component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Simulate'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Simulate component!',
  },
  title: {
    id: `${scope}.header`,
    defaultMessage: 'graph',
  },
  noTraversalTitle: {
    id: `${scope}.noTraversalTitle`,
    defaultMessage: 'Traversal',
  },
  noTraversalDescription: {
    id: `${scope}.noTraversalDescription`,
    defaultMessage: 'you can not simulate a graph containing no dependency',
  },
})
