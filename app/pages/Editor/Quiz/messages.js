/*
 * Quiz Messages
 *
 * This contains all the text for the Quiz component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.Quiz'

export default defineMessages({
  confirmMessageQuestion: {
    id: `${scope}.confirmMessage`,
    defaultMessage: 'Are you sure to delete this question?',
  },
  confirmMessageChoice: {
    id: `${scope}.confirmMessageChoice`,
    defaultMessage: 'Are you sure to delete this choice?',
  },
  yes: {
    id: `${scope}.yes`,
    defaultMessage: 'Yes',
  },
  no: {
    id: `${scope}.no`,
    defaultMessage: 'No',
  },
  quiz: {
    id: `${scope}.quiz`,
    defaultMessage: 'Quiz',
  },
  startAdding: {
    id: `${scope}.startAdding`,
    defaultMessage: 'Start Adding Quiz Questions',
  },
  questionIndex: {
    id: `${scope}.questionIndex`,
    defaultMessage: 'question {index}',
  },

  addChoice: {
    id: `${scope}.addChoice`,
    defaultMessage: 'Add Choice',
  },
  choices: {
    id: `${scope}.choices`,
    defaultMessage: 'Choices',
  },
  choiceIndex: {
    id: `${scope}.choiceIndex`,
    defaultMessage: 'choice {index}',
  },
  isCorrect: {
    id: `${scope}.isCorrect`,
    defaultMessage: 'is Correct?',
  },
  deleteChoice: {
    id: `${scope}.deleteChoice`,
    defaultMessage: 'Delete Choice',
  },
  addQuestion: {
    id: `${scope}.addQuestion`,
    defaultMessage: 'Add Question',
  },
  onlyText: {
    id: `${scope}.onlyText`,
    defaultMessage: 'Only Text',
  },
  withCode: {
    id: `${scope}.withCode`,
    defaultMessage: 'With Code',
  },
})
