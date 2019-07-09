/*
 * CodeCompiling Messages
 *
 * This contains all the text for the CodeCompiling component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.CodeCompiling'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the CodeCompiling component!',
  },
  question: {
    id: `${scope}.question`,
    defaultMessage: 'Question :',
  },
  questionPlaceholder: {
    id: `${scope}.questionPlaceholder`,
    defaultMessage: 'question',
  },
  language: {
    id: `${scope}.language`,
    defaultMessage: 'Language :',
  },
  solution: {
    id: `${scope}.solution`,
    defaultMessage: 'Solution :',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Placeholder :',
  },
  input: {
    id: `${scope}.input`,
    defaultMessage: 'Input :',
  },
  output: {
    id: `${scope}.output`,
    defaultMessage: 'Output :',
  },
  delete: {
    id: `${scope}.delete`,
    defaultMessage: 'Delete',
  },
  addTestCase: {
    id: `${scope}.addTestCase`,
    defaultMessage: 'Add Test Case',
  },
  preview: {
    id: `${scope}.preview`,
    defaultMessage: 'Preview',
  },
  codeCompiling: {
    id: `${scope}.codeCompiling`,
    defaultMessage: 'Code Compiling',
  },
})
