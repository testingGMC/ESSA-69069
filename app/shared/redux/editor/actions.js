/*
 *
 * Editor actions
 *
 */
import * as CONSTANTS from './constants'

export function clearState() {
  return {
    type: CONSTANTS.CLEAR_STATE_SUCCESS,
  }
}

export function fetchSkill(skillId) {
  return {
    type: CONSTANTS.FETCH_SKILL_REQUEST,
    skillId,
  }
}
export function updateSkill(skillId, skill) {
  return {
    type: CONSTANTS.UPDATE_SKILL_REQUEST,
    skillId,
    skill,
  }
}

export function addLearningStyle(learningStyle) {
  return {
    type: CONSTANTS.ADD_LEARNING_STYLE_REQUEST,
    learningStyle,
  }
}

export function deleteLearningStyle(learningStyleId) {
  return {
    type: CONSTANTS.DELETE_LEARNING_STYLE_REQUEST,
    learningStyleId,
  }
}

export function addPage(page, learningStyleId) {
  return {
    type: CONSTANTS.ADD_PAGE_REQUEST,
    page,
    learningStyleId,
  }
}

export function updatePage(pageId, page, learningStyleId) {
  return {
    type: CONSTANTS.UPDATE_PAGE_REQUEST,
    pageId,
    page,
    learningStyleId,
  }
}

export function deletePage(pageId, learningStyleId) {
  return {
    type: CONSTANTS.DELETE_PAGE_REQUEST,
    pageId,
    learningStyleId,
  }
}

export function addAssessment(assessment) {
  return {
    type: CONSTANTS.ADD_ASSESSMENT_REQUEST,
    assessment,
  }
}

export function deleteAssessment(assessmentId) {
  return {
    type: CONSTANTS.DELETE_ASSESSMENT_REQUEST,
    assessmentId,
  }
}

export function updateSelectedAssessmentId(assessmentId) {
  return {
    type: CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_REQUEST,
    assessmentId,
  }
}

export function fetchTemplates() {
  return {
    type: CONSTANTS.FETCH_TEMPLATES_REQUEST,
  }
}

export function addTemplate(template) {
  return {
    type: CONSTANTS.ADD_TEMPLATE_REQUEST,
    template,
  }
}

export function deleteTemplate(templateId) {
  return {
    type: CONSTANTS.DELETE_TEMPLATE_REQUEST,
    templateId,
  }
}

export function updateTemplate(templateId, template) {
  return {
    type: CONSTANTS.UPDATE_TEMPLATE_REQUEST,
    templateId,
    template,
  }
}

export function updateSelectedLearningStyleId(learningStyleId) {
  return {
    type: CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_REQUEST,
    learningStyleId,
  }
}
export function updateSelectedPageId(pageId) {
  return {
    type: CONSTANTS.UPDATE_SELECTED_PAGE_ID_REQUEST,
    pageId,
  }
}

export function addKeyword(keyword) {
  return {
    type: CONSTANTS.ADD_KEYWORD_REQUEST,
    keyword,
  }
}

export function updateKeyword(keywordId, keyword) {
  return {
    type: CONSTANTS.UPDATE_KEYWORD_REQUEST,
    keywordId,
    keyword,
  }
}

export function deleteKeyword(keywordId) {
  return {
    type: CONSTANTS.DELETE_KEYWORD_REQUEST,
    keywordId,
  }
}

export function updateSelectedKeywordId(keywordId) {
  return {
    type: CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_REQUEST,
    keywordId,
  }
}

export function updateReorderChallengeQuestion(questionId, text) {
  return {
    type: CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_REQUEST,
    questionId,
    text,
  }
}

export function addReorderChallengeStatement(statement, assessmentId) {
  return {
    type: CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_REQUEST,
    statement,
    assessmentId,
  }
}

export function updateReorderChallengeStatement(
  statementId,
  statement,
  assessmentId,
) {
  return {
    type: CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_REQUEST,
    statementId,
    statement,
    assessmentId,
  }
}

export function deleteReorderChallengeStatement(statementId, assessmentId) {
  return {
    type: CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_REQUEST,
    statementId,
    assessmentId,
  }
}

export function updateCodeCompilingQuestion(questionId, question) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_REQUEST,
    questionId,
    text: question,
  }
}

export function updateCodeCompilingLanguage(languageId, language) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_REQUEST,
    languageId,
    text: language,
  }
}

export function updateCodeCompilingSolution(solutionId, solution) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_REQUEST,
    solutionId,
    text: solution,
  }
}

export function updateCodeCompilingPlaceholder(placeholderId, placeholder) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_REQUEST,
    placeholderId,
    text: placeholder,
  }
}

export function updateCodeCompilingAddUseCase(assessmentId) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_REQUEST,
    assessmentId,
  }
}

export function updateCodeCompilingDeleteUseCase(testCaseId, assessmentId) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_REQUEST,
    testCaseId,
    assessmentId,
  }
}

export function updateCodeCompilingUpdateUseCase(
  testCaseId,
  assessmentId,
  testCase,
) {
  return {
    type: CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_REQUEST,
    testCaseId,
    assessmentId,
    testCase,
  }
}

export function addQuizQuestion(question, assessmentId) {
  return {
    type: CONSTANTS.ADD_QUIZ_QUESTION_REQUEST,
    question,
    assessmentId,
  }
}

export function updateQuizQuestion(questionId, question, assessmentId) {
  return {
    type: CONSTANTS.UPDATE_QUIZ_QUESTION_REQUEST,
    questionId,
    question,
    assessmentId,
  }
}

export function deleteQuizQuestion(questionId, assessmentId) {
  return {
    type: CONSTANTS.DELETE_QUIZ_QUESTION_REQUEST,
    questionId,
    assessmentId,
  }
}

export function updateQuizLanguage(languageId, language) {
  return {
    type: CONSTANTS.UPDATE_QUIZ_LANGUAGE_REQUEST,
    languageId,
    text: language,
  }
}

export function updateQuizCode(codeId, code) {
  return {
    type: CONSTANTS.UPDATE_QUIZ_CODE_REQUEST,
    codeId,
    text: code,
  }
}

export function addQuizChoice(choice, questionId, assessmentId) {
  return {
    type: CONSTANTS.ADD_QUIZ_CHOICE_REQUEST,
    choice,
    questionId,
    assessmentId,
  }
}

export function updateQuizChoice(choiceId, choice, questionId) {
  return {
    type: CONSTANTS.UPDATE_QUIZ_CHOICE_REQUEST,
    choiceId,
    choice,
    questionId,
  }
}

export function deleteQuizChoice(choiceId, questionId, assessmentId) {
  return {
    type: CONSTANTS.DELETE_QUIZ_CHOICE_REQUEST,
    choiceId,
    questionId,
    assessmentId,
  }
}

export function addFibElement(element, assessmentId) {
  return {
    type: CONSTANTS.ADD_FIB_ELEMENT_REQUEST,
    element,
    assessmentId,
  }
}

export function updateFibElement(elementId, element, assessmentId) {
  return {
    type: CONSTANTS.UPDATE_FIB_ELEMENT_REQUEST,
    elementId,
    element,
    assessmentId,
  }
}

export function deleteFibElement(elementId, assessmentId) {
  return {
    type: CONSTANTS.DELETE_FIB_ELEMENT_REQUEST,
    elementId,
    assessmentId,
  }
}

export const loadSimulatedNodes = nodes => ({
  type: CONSTANTS.LOAD_SIMULATED_NODES_REQUEST,
  nodes,
})

export const setDidUpdate = didUpdate => ({
  type: CONSTANTS.SET_DID_UPDATE_REQUEST,
  didUpdate,
})