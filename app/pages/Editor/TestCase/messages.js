/*
 * TestCase Messages
 *
 * This contains all the text for the TestCase component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.TestCase'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the TestCase component!',
  },
  test: {
    id: `${scope}.test`,
    defaultMessage: 'Test',
  },
  correctAnswer: {
    id: `${scope}.correctAnswer`,
    defaultMessage: 'Correct Answer',
  },
  wrongAnswer: {
    id: `${scope}.wrongAnswer`,
    defaultMessage: 'Wrong Answer',
  },
  compilationError: {
    id: `${scope}.compilationError`,
    defaultMessage: 'Compilation Error',
  },
  runtimeError: {
    id: `${scope}.runtimeError`,
    defaultMessage: 'Runtime Error',
  },
  tryAgain: {
    id: `${scope}.tryAgain`,
    defaultMessage: 'Try Again',
  },
  areYouSure: {
    id: `${scope}.areYouSure`,
    defaultMessage: 'Are you sure to delete this test case?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
})
