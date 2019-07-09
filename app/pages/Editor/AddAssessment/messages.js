/*
 * AddAssessment Messages
 *
 * This contains all the text for the AddAssessment component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.AddAssessment'

export default defineMessages({
  quiz: {
    id: `${scope}.quiz`,
    defaultMessage: 'Quiz',
  },
  reorderChallenge: {
    id: `${scope}.reorderChallenge`,
    defaultMessage: 'Reorder challenge',
  },
  fillInTheBlank: {
    id: `${scope}.fillInTheBlank`,
    defaultMessage: 'Fill in the blank',
  },
  codeCompiling: {
    id: `${scope}.codeCompiling`,
    defaultMessage: 'Code Compiling',
  },
})
