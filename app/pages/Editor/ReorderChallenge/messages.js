/*
 * ReorderChallenge Messages
 *
 * This contains all the text for the ReorderChallenge component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.ReorderChallenge'

export default defineMessages({
  confirmMessage: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure to delete this question?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  validate: {
    id: `${scope}.validate`,
    defaultMessage: 'validate',
  },
  question: {
    id: `${scope}.question`,
    defaultMessage: 'question',
  },
  update: {
    id: `${scope}.update`,
    defaultMessage: 'update',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'delete',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'cancel',
  },
  reorderChallenge: {
    id: `${scope}.reorderChallenge`,
    defaultMessage: 'Reorder Challenge',
  },
  listOfStatements: {
    id: `${scope}.listOfStatements`,
    defaultMessage: 'List of statements correctly ordered',
  },
  updateTheText: {
    id: `${scope}.updateTheText`,
    defaultMessage: 'update the text',
  },
  addAStatement: {
    id: `${scope}.addAStatement`,
    defaultMessage: 'Add a statement',
  },
  addReorderChallengeStatement: {
    id: `${scope}.addReorderChallengeStatement`,
    defaultMessage: 'Add Statement',
  },
})
