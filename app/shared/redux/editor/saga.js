import { takeEvery, put, all, call } from 'redux-saga/effects'
import uuidv4 from 'uuid/v4'
import * as api from 'shared/services/editor.service'
import * as apiGraphnos from 'shared/services/graphnos.service'
import { createKey } from 'shared/redux/editor/utils/keysPrefixes'
import { push } from 'connected-react-router'
import routes from 'shared/routes'
import {
  LEARNING_STYLE,
  PAGE,
  ASSESSMENT_ELEMENT,
  KEYWORD,
  QUIZ_TYPE,
  REORDER_TYPE,
  FILL_IN_THE_BLANKS_TYPE,
  CODE_COMPILING_TYPE,
} from 'shared/redux/editor/utils/editorConstants'
import * as CONSTANTS from './constants'
import * as LIVESHARE_CONSTANTS from '../liveshare/constants'
import { apiToReducer, reducerToApi } from './utils/jsonConverter'

// Individual exports for testing
export function* fetchSkill(action) {
  try {
    const data = yield call(apiGraphnos.getSkill, action.skillId)
    yield put({
      type: CONSTANTS.FETCH_SKILL_SUCCESS,
      name: data.model.name,
      description: data.model.description,
      id: data.model.id,
      data: apiToReducer(data.model),
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.FETCH_SKILL_FAILURE,
      e,
    })
  }
}
export function* updateSkill(action) {
  try {
    yield call(
      apiGraphnos.updateSkill,
      action.skillId,
      reducerToApi(action.skill),
    )

    yield put({
      type: CONSTANTS.UPDATE_SKILL_SUCCESS,
      didUpdate: false,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.UPDATE_SKILL_FAILURE,
      e,
    })
  }
}

export function* addLearningStyle(action) {
  const learningStyleId = createKey(uuidv4(), LEARNING_STYLE)
  try {
    yield put({
      type: CONSTANTS.ADD_LEARNING_STYLE_SUCCESS,
      learningStyle: action.learningStyle,
      learningStyleId,
    })
    yield put({
      type: CONSTANTS.ADD_PAGE_REQUEST,
      page: { type: action.learningStyle.type },
      learningStyleId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_LEARNING_STYLE_FAILURE,
      e,
    })
  }
}
export function* deleteLearningStyle(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_LEARNING_STYLE_SUCCESS,
      learningStyleId: action.learningStyleId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_LEARNING_STYLE_FAILURE,
      e,
    })
  }
}
export function* addPage(action) {
  try {
    const pageId = createKey(uuidv4(), PAGE)
    yield put({
      type: CONSTANTS.ADD_PAGE_SUCCESS,
      page: action.page,
      pageId,
      learningStyleId: action.learningStyleId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_PAGE_FAILURE,
      e,
    })
  }
}
export function* updatePage(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_PAGE_SUCCESS,
      pageId: action.pageId,
      page: action.page,
      learningStyleId: action.learningStyleId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_PAGE_FAILURE,
      e,
    })
  }
}
export function* deletePage(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_PAGE_SUCCESS,
      pageId: action.pageId,
      learningStyleId: action.learningStyleId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_PAGE_FAILURE,
      e,
    })
  }
}

export function* addAssessment(action) {
  try {
    const assessmentId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const questionId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const languageId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const solutionId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const placeholderId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const testCaseId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const { assessment } = action
    const content = {}
    if (action.assessment.type === QUIZ_TYPE) {
      content.assessment = {
        ...assessment,
        questions: [],
        elementsOfAssessment: [],
      }
    }
    if (action.assessment.type === REORDER_TYPE) {
      content.assessment = {
        ...assessment,
        statements: [],
        questionId,
        elementsOfAssessment: [questionId],
      }
      content.elementsToCreate = [questionId]
    }
    if (action.assessment.type === FILL_IN_THE_BLANKS_TYPE) {
      content.assessment = {
        ...assessment,
        elements: [],
        elementsOfAssessment: [],
      }
    }
    if (action.assessment.type === CODE_COMPILING_TYPE) {
      content.assessment = {
        ...assessment,
        questionId,
        languageId,
        solutionId,
        placeholderId,
        testCases: [],
        elementsOfAssessment: [
          questionId,
          languageId,
          solutionId,
          placeholderId,
        ],
      }
      content.elementsToCreate = [
        questionId,
        languageId,
        solutionId,
        placeholderId,
      ]
    }
    yield put({
      type: CONSTANTS.ADD_ASSESSMENT_SUCCESS,
      ...content,

      assessmentId,
    })
    if (action.assessment.type === 3) {
      yield put({
        type: CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_REQUEST,
        testCaseId,
        assessmentId,
      })
    }
  } catch (e) {
    yield put({
      type: CONSTANTS.ADD_ASSESSMENT_FAILURE,
      e,
    })
  }
}
export function* deleteAssessment(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_ASSESSMENT_SUCCESS,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_ASSESSMENT_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingQuestion(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_SUCCESS,
      text: action.text,
      questionId: action.questionId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingLanguage(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_SUCCESS,
      text: action.text,
      languageId: action.languageId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingSolution(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_SUCCESS,
      text: action.text,
      solutionId: action.solutionId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingPlaceholder(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_SUCCESS,
      text: action.text,
      placeholderId: action.placeholderId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingAddTestCase(action) {
  try {
    const testCaseId = createKey(uuidv4(), ASSESSMENT_ELEMENT)

    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_SUCCESS,
      testCaseId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingDeleteTestCase(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_SUCCESS,
      testCaseId: action.testCaseId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_FAILURE,
      e,
    })
  }
}

export function* updateCodeCompilingUpdateTestCase(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_SUCCESS,
      testCaseId: action.testCaseId,
      assessmentId: action.assessmentId,
      testCase: action.testCase,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_FAILURE,
      e,
    })
  }
}

export function* fetchTemplates() {
  try {
    const data = yield call(api.fetchTemplates)
    yield put({
      type: CONSTANTS.FETCH_TEMPLATES_SUCCESS,
      template: data.model,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.FETCH_TEMPLATES_FAILURE,
      e,
    })
  }
}
export function* addTemplate(action) {
  try {
    const data = yield call(api.addTemplate, action.template)
    yield put({
      type: CONSTANTS.ADD_TEMPLATE_SUCCESS,
      template: data.model,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.ADD_TEMPLATE_FAILURE,
      e,
    })
  }
}
export function* deleteTemplate(action) {
  try {
    yield call(api.deleteTemplate, action.templateId)
    yield put({
      type: CONSTANTS.DELETE_TEMPLATE_SUCCESS,
      templateId: action.templateId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_TEMPLATE_FAILURE,
      e,
    })
  }
}
export function* updateTemplate(action) {
  try {
    const data = yield call(
      api.updateTemplate,
      action.templateId,
      action.template,
    )
    yield put({
      type: CONSTANTS.UPDATE_TEMPLATE_SUCCESS,
      templateId: action.templateId,
      template: data.model,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_TEMPLATE_FAILURE,
      e,
    })
  }
}
export function* updateSelectedLearningStyleId(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_SUCCESS,
      learningStyleId: action.learningStyleId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_FAILURE,
      e,
    })
  }
}
export function* updateSelectedPageId(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_PAGE_ID_SUCCESS,
      pageId: action.pageId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_PAGE_ID_FAILURE,
      e,
    })
  }
}

export function* updateSelectedAssessmentId(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_SUCCESS,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_FAILURE,
      e,
    })
  }
}

export function* addKeyword(action) {
  try {
    const keywordId = createKey(uuidv4(), KEYWORD)
    yield put({
      type: CONSTANTS.ADD_KEYWORD_SUCCESS,
      keyword: action.keyword,
      keywordId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_KEYWORD_FAILURE,
      e,
    })
  }
}
export function* updateKeyword(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_KEYWORD_SUCCESS,
      keywordId: action.keywordId,
      keyword: action.keyword,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_KEYWORD_FAILURE,
      e,
    })
  }
}
export function* deleteKeyword(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_KEYWORD_SUCCESS,
      keywordId: action.keywordId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_KEYWORD_FAILURE,
      e,
    })
  }
}

export function* updateSelectedKeywordId(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_SUCCESS,
      keywordId: action.keywordId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_FAILURE,
      e,
    })
  }
}

export function* updateReorderChallengeQuestion(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_SUCCESS,
      text: action.text,
      questionId: action.questionId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_FAILURE,
      e,
    })
  }
}

export function* addReorderChallengeStatement(action) {
  try {
    const statementId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    yield put({
      type: CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_SUCCESS,
      statement: action.statement,
      statementId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_FAILURE,
      e,
    })
  }
}
export function* updateReorderChallengeStatement(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_SUCCESS,
      statementId: action.statementId,
      statement: action.statement,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_FAILURE,
      e,
    })
  }
}
export function* deleteReorderChallengeStatement(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_SUCCESS,
      statementId: action.statementId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_FAILURE,
      e,
    })
  }
}

export function* addQuizQuestion(action) {
  try {
    const questionId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const languageId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const codeId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    const question = { ...action.question, languageId, codeId }
    yield put({
      type: CONSTANTS.ADD_QUIZ_QUESTION_SUCCESS,
      question,
      questionId,
      languageId,
      codeId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_QUIZ_QUESTION_FAILURE,
      e,
    })
  }
}
export function* updateQuizQuestion(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_QUESTION_SUCCESS,
      questionId: action.questionId,
      question: action.question,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_QUESTION_FAILURE,
      e,
    })
  }
}
export function* deleteQuizQuestion(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_QUIZ_QUESTION_SUCCESS,
      questionId: action.questionId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_QUIZ_QUESTION_FAILURE,
      e,
    })
  }
}

export function* updateQuizLanguage(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_LANGUAGE_SUCCESS,
      text: action.text,
      languageId: action.languageId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_LANGUAGE_FAILURE,
      e,
    })
  }
}

export function* updateQuizCode(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_CODE_SUCCESS,
      text: action.text,
      codeId: action.codeId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_CODE_FAILURE,
      e,
    })
  }
}

export function* addQuizChoice(action) {
  try {
    const choiceId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    yield put({
      type: CONSTANTS.ADD_QUIZ_CHOICE_SUCCESS,
      choiceId,
      choice: action.choice,
      questionId: action.questionId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_QUIZ_CHOICE_FAILURE,
      e,
    })
  }
}
export function* updateQuizChoice(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_CHOICE_SUCCESS,
      choiceId: action.choiceId,
      choice: action.choice,
      questionId: action.questionId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_QUIZ_CHOICE_FAILURE,
      e,
    })
  }
}
export function* deleteQuizChoice(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_QUIZ_CHOICE_SUCCESS,
      choiceId: action.choiceId,
      questionId: action.questionId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_QUIZ_CHOICE_FAILURE,
      e,
    })
  }
}

export function* addFibElement(action) {
  try {
    const elementId = createKey(uuidv4(), ASSESSMENT_ELEMENT)
    yield put({
      type: CONSTANTS.ADD_FIB_ELEMENT_SUCCESS,
      element: action.element,
      elementId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.ADD_FIB_ELEMENT_FAILURE,
      e,
    })
  }
}
export function* updateFibElement(action) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_FIB_ELEMENT_SUCCESS,
      elementId: action.elementId,
      element: action.element,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_FIB_ELEMENT_FAILURE,
      e,
    })
  }
}
export function* deleteFibElement(action) {
  try {
    yield put({
      type: CONSTANTS.DELETE_FIB_ELEMENT_SUCCESS,
      elementId: action.elementId,
      assessmentId: action.assessmentId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_FIB_ELEMENT_FAILURE,
      e,
    })
  }
}

export function* setDidUpdate(action) {
  try {
    yield put({
      type: CONSTANTS.SET_DID_UPDATE_SUCCESS,
      didUpdate: action.didUpdate,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SET_DID_UPDATE_FAILURE,
      e,
    })
  }
}

export function* loadSimulatedNodes({ nodes }) {
  try {
    yield put({
      type: CONSTANTS.LOAD_SIMULATED_NODES_SUCCESS,
      nodes,
    })
    yield put(push(routes.EDITOR.linkPath(nodes[0])))
  } catch (e) {
    yield put({
      type: CONSTANTS.LOAD_SIMULATED_NODES_FAILURE,
    })
  }
}

export function* loadSimulatedNodesWatcher() {
  yield takeEvery(CONSTANTS.LOAD_SIMULATED_NODES_REQUEST, loadSimulatedNodes)
}

export function* fetchSkillWatcher() {
  yield takeEvery(CONSTANTS.FETCH_SKILL_REQUEST, fetchSkill)
}
export function* updateSkillWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_SKILL_REQUEST, updateSkill)
}
export function* addLearningStyleWatcher() {
  yield takeEvery(CONSTANTS.ADD_LEARNING_STYLE_REQUEST, addLearningStyle)
}
export function* deleteLearningStyleWatcher() {
  yield takeEvery(CONSTANTS.DELETE_LEARNING_STYLE_REQUEST, deleteLearningStyle)
}
export function* addPageWatcher() {
  yield takeEvery(CONSTANTS.ADD_PAGE_REQUEST, addPage)
}
export function* updatePageWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_PAGE_REQUEST, updatePage)
}
export function* updateCodeCompilingQuestionWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_REQUEST,
    updateCodeCompilingQuestion,
  )
}
export function* updateCodeCompilingLanguageWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_REQUEST,
    updateCodeCompilingLanguage,
  )
}
export function* updateCodeCompilingSolutionWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_REQUEST,
    updateCodeCompilingSolution,
  )
}

export function* updateCodeCompilingPlaceholderWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_REQUEST,
    updateCodeCompilingPlaceholder,
  )
}

export function* updateCodeCompilingAddTestCaseWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_REQUEST,
    updateCodeCompilingAddTestCase,
  )
}
export function* updateCodeCompilingDeleteTestCaseWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_REQUEST,
    updateCodeCompilingDeleteTestCase,
  )
}
export function* updateCodeCompilingUpdateTestCaseWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_REQUEST,
    updateCodeCompilingUpdateTestCase,
  )
}

export function* deletePageWatcher() {
  yield takeEvery(CONSTANTS.DELETE_PAGE_REQUEST, deletePage)
}
export function* addAssessmentWatcher() {
  yield takeEvery(CONSTANTS.ADD_ASSESSMENT_REQUEST, addAssessment)
}
export function* deleteAssessmentWatcher() {
  yield takeEvery(CONSTANTS.DELETE_ASSESSMENT_REQUEST, deleteAssessment)
}
export function* fetchTemplatesWatcher() {
  yield takeEvery(CONSTANTS.FETCH_TEMPLATES_REQUEST, fetchTemplates)
}
export function* addTemplateWatcher() {
  yield takeEvery(CONSTANTS.ADD_TEMPLATE_REQUEST, addTemplate)
}
export function* deleteTemplateWatcher() {
  yield takeEvery(CONSTANTS.DELETE_TEMPLATE_REQUEST, deleteTemplate)
}
export function* updateTemplateWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_TEMPLATE_REQUEST, updateTemplate)
}

export function* updateSelectedLearningStyleIdWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_REQUEST,
    updateSelectedLearningStyleId,
  )
}
export function* updateSelectedPageIdWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_SELECTED_PAGE_ID_REQUEST,
    updateSelectedPageId,
  )
}
export function* updateSelectedAssessmentIdWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_REQUEST,
    updateSelectedAssessmentId,
  )
}
export function* addKeywordWatcher() {
  yield takeEvery(CONSTANTS.ADD_KEYWORD_REQUEST, addKeyword)
}
export function* updateKeywordWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_KEYWORD_REQUEST, updateKeyword)
}
export function* deleteKeywordWatcher() {
  yield takeEvery(CONSTANTS.DELETE_KEYWORD_REQUEST, deleteKeyword)
}
export function* updateSelectedKeywordIdWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_REQUEST,
    updateSelectedKeywordId,
  )
}

export function* updateReorderChallengeQuestionWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_REQUEST,
    updateReorderChallengeQuestion,
  )
}

export function* addReorderChallengeStatementWatcher() {
  yield takeEvery(
    CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_REQUEST,
    addReorderChallengeStatement,
  )
}
export function* updateReorderChallengeStatementWatcher() {
  yield takeEvery(
    CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_REQUEST,
    updateReorderChallengeStatement,
  )
}
export function* deleteReorderChallengeStatementWatcher() {
  yield takeEvery(
    CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_REQUEST,
    deleteReorderChallengeStatement,
  )
}

export function* addQuizQuestionWatcher() {
  yield takeEvery(CONSTANTS.ADD_QUIZ_QUESTION_REQUEST, addQuizQuestion)
}
export function* updateQuizQuestionWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_QUIZ_QUESTION_REQUEST, updateQuizQuestion)
}

export function* updateQuizLanguageWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_QUIZ_LANGUAGE_REQUEST, updateQuizLanguage)
}

export function* updateQuizCodeWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_QUIZ_CODE_REQUEST, updateQuizCode)
}
export function* deleteQuizQuestionWatcher() {
  yield takeEvery(CONSTANTS.DELETE_QUIZ_QUESTION_REQUEST, deleteQuizQuestion)
}

export function* addQuizChoiceWatcher() {
  yield takeEvery(CONSTANTS.ADD_QUIZ_CHOICE_REQUEST, addQuizChoice)
}
export function* updateQuizChoiceWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_QUIZ_CHOICE_REQUEST, updateQuizChoice)
}
export function* deleteQuizChoiceWatcher() {
  yield takeEvery(CONSTANTS.DELETE_QUIZ_CHOICE_REQUEST, deleteQuizChoice)
}

export function* addFibElementWatcher() {
  yield takeEvery(CONSTANTS.ADD_FIB_ELEMENT_REQUEST, addFibElement)
}
export function* updateFibElementWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_FIB_ELEMENT_REQUEST, updateFibElement)
}
export function* deleteFibElementWatcher() {
  yield takeEvery(CONSTANTS.DELETE_FIB_ELEMENT_REQUEST, deleteFibElement)
}
export function* setDidUpdateWatcher() {
  yield takeEvery(CONSTANTS.SET_DID_UPDATE_REQUEST, setDidUpdate)
}
export default function* editorSaga() {
  yield all([
    fetchSkillWatcher(),
    updateSkillWatcher(),
    addLearningStyleWatcher(),
    deleteLearningStyleWatcher(),
    addPageWatcher(),
    updatePageWatcher(),
    deletePageWatcher(),
    updateReorderChallengeQuestionWatcher(),
    addAssessmentWatcher(),
    deleteAssessmentWatcher(),
    fetchTemplatesWatcher(),
    addTemplateWatcher(),
    deleteTemplateWatcher(),
    updateTemplateWatcher(),
    updateSelectedLearningStyleIdWatcher(),
    updateSelectedAssessmentIdWatcher(),
    addKeywordWatcher(),
    updateKeywordWatcher(),
    deleteKeywordWatcher(),
    updateSelectedKeywordIdWatcher(),
    addReorderChallengeStatementWatcher(),
    updateReorderChallengeStatementWatcher(),
    deleteReorderChallengeStatementWatcher(),
    addQuizQuestionWatcher(),
    updateQuizQuestionWatcher(),
    deleteQuizQuestionWatcher(),
    updateQuizLanguageWatcher(),
    updateQuizCodeWatcher(),
    addQuizChoiceWatcher(),
    updateQuizChoiceWatcher(),
    deleteQuizChoiceWatcher(),
    addFibElementWatcher(),
    updateFibElementWatcher(),
    deleteFibElementWatcher(),
    updateSelectedPageIdWatcher(),
    updateCodeCompilingQuestionWatcher(),
    updateCodeCompilingLanguageWatcher(),
    updateCodeCompilingPlaceholderWatcher(),
    updateCodeCompilingSolutionWatcher(),
    updateCodeCompilingAddTestCaseWatcher(),
    updateCodeCompilingDeleteTestCaseWatcher(),
    updateCodeCompilingUpdateTestCaseWatcher(),
    loadSimulatedNodesWatcher(),
    setDidUpdateWatcher(),
  ])
}
