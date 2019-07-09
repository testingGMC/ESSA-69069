import { isEmpty } from 'lodash'
import {
  QUIZ_TYPE,
  REORDER_TYPE,
  FILL_IN_THE_BLANKS_TYPE,
  CODE_COMPILING_TYPE,
  BLANK_TYPE,
  QUIZ_QUESTION_WITH_CODE,
} from '../../../../shared/redux/editor/utils/editorConstants'
function getWarnings(skill, messagesList) {
  const warnings = { isEmpty: true, data: {} }
  skill.data.assessments.forEach((assessmentId, assessmentIndex) => {
    warnings.data[assessmentIndex + 1] = []
    if (skill.data[assessmentId].type === CODE_COMPILING_TYPE) {
      if (isEmpty(skill.data[skill.data[assessmentId].questionId].text)) {
        warnings.isEmpty = false
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.codeCompilingQuestion,
        ]
      }
      if (isEmpty(skill.data[skill.data[assessmentId].solutionId].text)) {
        warnings.isEmpty = false
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.codeCompilingSolution,
        ]
      }
      if (isEmpty(skill.data[skill.data[assessmentId].placeholderId].text)) {
        warnings.isEmpty = false
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.codeCompilingPlaceholder,
        ]
      }
    }

    if (skill.data[assessmentId].type === QUIZ_TYPE) {
      if (isEmpty(skill.data[assessmentId].questions)) {
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.quizEmpty,
        ]
        warnings.isEmpty = false
      }

      skill.data[assessmentId].questions.map((questionId, quizIndex) => {
        if (
          skill.data[questionId].questionType === QUIZ_QUESTION_WITH_CODE &&
          isEmpty(skill.data[skill.data[questionId].codeId].text)
        ) {
          warnings.data[assessmentIndex + 1] = [
            ...warnings.data[assessmentIndex + 1],
            `${messagesList.quizCodeIsEmpty} (${quizIndex + 1})`,
          ]
          warnings.isEmpty = false
        }
        if (isEmpty(skill.data[questionId].text.trim())) {
          warnings.data[assessmentIndex + 1] = [
            ...warnings.data[assessmentIndex + 1],
            `${messagesList.quizQuestionIsEmpty} (${quizIndex + 1})`,
          ]
          warnings.isEmpty = false
        }
        if (skill.data[questionId].choices.length <= 1) {
          warnings.data[assessmentIndex + 1] = [
            ...warnings.data[assessmentIndex + 1],
            `${messagesList.quizHasLessThanTwoChoices} (${quizIndex + 1})`,
          ]
          warnings.isEmpty = false
        }

        let foundCorrectAnswer = false
        skill.data[questionId].choices.map(choicesId => {
          if (skill.data[choicesId].isCorrect) {
            foundCorrectAnswer = true
          }
        })
        if (!foundCorrectAnswer) {
          warnings.data[assessmentIndex + 1] = [
            ...warnings.data[assessmentIndex + 1],
            `${messagesList.quizDontHaveACorrectAnswer} (${quizIndex + 1})`,
          ]
          warnings.isEmpty = false
        }
      })
    }

    if (skill.data[assessmentId].type === REORDER_TYPE) {
      if (
        isEmpty(skill.data[skill.data[assessmentId].questionId].text.trim())
      ) {
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.reorderQuestionIsEmpty,
        ]
        warnings.isEmpty = false
      }
      if (skill.data[assessmentId].statements.length <= 1) {
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.atLeastTwoStatements,
        ]
        warnings.isEmpty = false
      }
    }

    let numberOfBlanks = 0

    if (skill.data[assessmentId].type === FILL_IN_THE_BLANKS_TYPE) {
      skill.data[assessmentId].elements.map(element => {
        if (skill.data[element].type === BLANK_TYPE) {
          numberOfBlanks += 1
        }
      })
      if (numberOfBlanks <= 1) {
        warnings.data[assessmentIndex + 1] = [
          ...warnings.data[assessmentIndex + 1],
          messagesList.atLeastTwoBlanks,
        ]
        warnings.isEmpty = false
      }
    }
  })
  return warnings
}

export default getWarnings
