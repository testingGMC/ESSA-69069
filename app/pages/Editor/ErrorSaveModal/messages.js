/*
 * ErrorSaveModal Messages
 *
 * This contains all the text for the ErrorSaveModal component.
 */

import { defineMessages } from 'react-intl'

export const scope = 'app.components.ErrorSaveModal'

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the ErrorSaveModal component!',
  },
  assessment: {
    id: `${scope}.assessment`,
    defaultMessage: 'Assessment',
  },
  warnings: {
    id: `${scope}.warnings`,
    defaultMessage: 'Warnings',
  },
  codeCompilingQuestion: {
    id: `${scope}.codeCompilingQuestion`,
    defaultMessage: 'Code compiling question is empty',
  },
  codeCompilingSolution: {
    id: `${scope}.codeCompilingSolution`,
    defaultMessage: 'Code compiling solution is empty',
  },
  codeCompilingPlaceholder: {
    id: `${scope}.codeCompilingPlaceholder`,
    defaultMessage: 'Code compiling placeholder is empty',
  },
  reorderQuestion: {
    id: `${scope}.reorderQuestion`,
    defaultMessage: 'Reorder question is empty',
  },
  quizEmpty: {
    id: `${scope}.quizEmpty`,
    defaultMessage: 'Quiz must have at least one question',
  },
  quizQuestionIsEmpty: {
    id: `${scope}.quizQuestionIsEmpty`,
    defaultMessage: 'Question is empty',
  },
  quizCodeIsEmpty: {
    id: `${scope}.quizCodeIsEmpty`,
    defaultMessage: 'Code is empty',
  },
  quizHasLessThanTwoChoices: {
    id: `${scope}.quizHasLessThanTwoChoices`,
    defaultMessage: 'Question has less than two choices',
  },
  quizDontHaveACorrectAnswer: {
    id: `${scope}.quizDontHaveACorrectAnswer`,
    defaultMessage: "Question doesn't have a correct answer",
  },
  reorderQuestionIsEmpty: {
    id: `${scope}.reorderQuestionIsEmpty`,
    defaultMessage: 'Reorder question is empty',
  },
  atLeastTwoStatements: {
    id: `${scope}.atLeastTwoStatements`,
    defaultMessage: 'At least two statements',
  },
  atLeastTwoBlanks: {
    id: `${scope}.atLeastTwoBlanks`,
    defaultMessage: 'At least two blanks',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'cancel',
  },
  saveAnyway: {
    id: `${scope}.saveAnyway`,
    defaultMessage: 'save anyway',
  },
})
