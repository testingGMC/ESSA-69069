/* eslint-disable array-callback-return */
/* eslint-disable prefer-destructuring */
/*
 *
 * Editor reducer
 *
 */
import produce from 'immer'
import { isEmpty, uniq } from 'lodash'
import { adaptContent } from '../../utils/liveshare-content-adapter'
import * as CONSTANTS from './constants'
import * as LIVESHARE_CONSTANTS from '../liveshare/constants'
import { patch } from '../../utils/patch-manager'

export const initialState = {
  loading: false,
  selectedLearningStyleId: '',
  selectedAssessmentId: '',
  selectedKeywordId: '',
  selectedPageId: '',
  didUpdate: false,
  skillLoaded: false,
  trackChanges: true,
  replicatedPages: {},
  origin: '',
  selections: {},
  data: {
    learningStyles: [],
    assessments: [],
    keywords: [],
    templates: [],
    simulatedNodes: [],
  },
}

/* eslint-disable default-case, no-param-reassign */
const editorReducer = (state = initialState, action) =>
  produce(state, draft => {
    let lsPos
    let assessmentPos
    let keywordPos
    let pagePos
    let templatePos
    let statementPos
    let questionPos
    let choicePos
    let elementPos
    let simulatedNodes
    let patchedData
    switch (action.type) {
      case CONSTANTS.FETCH_SKILL_REQUEST:
        draft.loading = true
        draft.skillLoaded = false

        break
      case CONSTANTS.CLEAR_STATE_SUCCESS:
        draft.data = initialState.data
        draft.loading = false
        draft.selectedLearningStyleId = ''
        draft.selectedAssessmentId = ''
        draft.selectedKeywordId = ''
        draft.selectedPageId = ''
        break
      case CONSTANTS.FETCH_SKILL_SUCCESS:
        simulatedNodes = draft.data.simulatedNodes
        draft.data = {
          ...initialState.data,
          ...action.data,
          name: action.name,
          description: action.description,
          id: action.id,
          simulatedNodes,
        }

        if (action.data.learningStyles[0]) {
          draft.selectedLearningStyleId = action.data.learningStyles[0]
        } else {
          draft.selectedLearningStyleId = ''
        }
        draft.selectedAssessmentId = ''
        draft.selectedKeywordId = ''
        if (
          draft.data.learningStyles !== null &&
          draft.data.learningStyles.length > 0
        ) {
          draft.data.learningStyles.map(ls => {
            if (
              draft.data[ls] !== null &&
              draft.data[ls].pages !== null &&
              draft.data[ls].pages.length > 0
            ) {
              draft.data[ls].pages.map(pageId => {
                draft.replicatedPages[pageId] = []
              })
            }
          })
          draft.selectedLearningStyleId = draft.data.learningStyles[0]
          if (
            draft.data[draft.selectedLearningStyleId] !== null &&
            draft.data[draft.selectedLearningStyleId].pages !== null &&
            draft.data[draft.selectedLearningStyleId].pages.length > 0
          ) {
            draft.selectedPageId =
              draft.data[draft.selectedLearningStyleId].pages[0]
          }
        }
        // uniqueness fix
        draft.data.learningStyles = uniq(draft.data.learningStyles)
        draft.data.learningStyles.map(ls => {
          draft.data[ls].pages = uniq(draft.data[ls].pages)
        })
        draft.skillLoaded = true
        draft.loading = false
        draft.didUpdate = false
        draft.origin = JSON.stringify(draft.data)
        break
      case CONSTANTS.FETCH_SKILL_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SKILL_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_SKILL_SUCCESS:
        draft.didUpdate = false
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SKILL_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_LEARNING_STYLE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_LEARNING_STYLE_SUCCESS:
        draft.data[action.learningStyleId] = {
          id: action.learningStyleId,
          ...action.learningStyle,
          pages: [],
        }
        draft.data.learningStyles.push(action.learningStyleId)
        draft.selectedLearningStyleId = action.learningStyleId
        break
      case CONSTANTS.ADD_LEARNING_STYLE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_LEARNING_STYLE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_LEARNING_STYLE_SUCCESS:
        lsPos = draft.data.learningStyles.findIndex(
          lsId => lsId === action.learningStyleId,
        )
        if (lsPos !== 0) {
          draft.selectedLearningStyleId = draft.data.learningStyles[0]
        } else if (draft.data.learningStyles.length !== 1) {
          draft.selectedLearningStyleId = draft.data.learningStyles[1]
        } else {
          draft.selectedLearningStyleId = ''
        }
        draft.selectedPageId =
          draft.data[draft.selectedLearningStyleId].pages[0]
        draft.data.learningStyles.splice(lsPos, 1)
        draft.data[action.learningStyleId].pages.forEach(pageId => {
          delete draft.data[pageId]
        })
        delete draft.data[action.learningStyleId]
        draft.loading = false
        break
      case CONSTANTS.DELETE_LEARNING_STYLE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_SUCCESS:
        draft.selectedLearningStyleId = action.learningStyleId
        if (!isEmpty(action.learningStyleId)) {
          draft.selectedAssessmentId = ''
          if (
            draft.data[draft.selectedLearningStyleId] !== null &&
            draft.data[draft.selectedLearningStyleId].pages !== null &&
            draft.data[draft.selectedLearningStyleId].pages.length > 0
          )
            draft.selectedPageId =
              draft.data[draft.selectedLearningStyleId].pages[0]
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SELECTED_LEARNING_STYLE_ID_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_PAGE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_PAGE_SUCCESS:
        draft.data[action.pageId] = {
          id: action.pageId,
          ...action.page,
          content: '',
        }
        draft.data[action.learningStyleId].pages.push(action.pageId)
        draft.selectedPageId = action.pageId
        draft.replicatedPages[action.pageId] = []
        draft.loading = false
        break
      case CONSTANTS.ADD_PAGE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_PAGE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_PAGE_SUCCESS:
        draft.data[action.pageId] = {
          ...draft.data[action.pageId],
          ...action.page,
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_PAGE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_PAGE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_PAGE_SUCCESS:
        pagePos = draft.data[action.learningStyleId].pages.findIndex(
          pageId => pageId === action.pageId,
        )
        draft.data[action.learningStyleId].pages.splice(pagePos, 1)
        delete draft.data[action.pageId]
        delete draft.replicatedPages[action.pageId]
        // select first page
        if (draft.data[action.learningStyleId].pages.length > 0)
          draft.selectedPageId = draft.data[action.learningStyleId].pages[0]

        draft.loading = false
        break
      case CONSTANTS.DELETE_PAGE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_ASSESSMENT_REQUEST:
        draft.loading = true
        break

      case CONSTANTS.ADD_ASSESSMENT_SUCCESS:
        draft.data[action.assessmentId] = {
          id: action.assessmentId,
          ...action.assessment,
        }
        draft.data.assessments.push(action.assessmentId)

        draft.selectedAssessmentId = action.assessmentId
        draft.selectedLearningStyleId = ''
        if (action.elementsToCreate) {
          action.elementsToCreate.forEach(element => {
            draft.data[element] = { id: element, text: '' }
          })
        }
        draft.loading = false
        break
      case CONSTANTS.ADD_ASSESSMENT_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_SUCCESS:
        draft.data[action.questionId].text = action.text
        draft.loading = false
        break
      case CONSTANTS.UPDATE_REORDER_CHALLENGE_QUESTION_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_SUCCESS:
        draft.data[action.questionId].text = action.text
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_QUESTION_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_SUCCESS:
        draft.data[action.languageId].text = action.text
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_LANGUAGE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_SUCCESS:
        draft.data[action.solutionId].text = action.text
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_SOLUTION_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_SUCCESS:
        draft.data[action.placeholderId].text = action.text
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_PLACEHOLDER_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_SUCCESS:
        draft.data[action.testCaseId] = {
          id: action.testCaseId,
          input: '',
          output: '',
        }
        draft.data[action.assessmentId].testCases.push(action.testCaseId)
        draft.data[action.assessmentId].elementsOfAssessment.push(
          action.testCaseId,
        )
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_ADD_TEST_CASE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_SUCCESS:
        // delete the element testCaseId from the object data
        delete draft.data[action.testCaseId]
        // filter testCases array that contains testCases Id
        draft.data[action.assessmentId].testCases = draft.data[
          action.assessmentId
        ].testCases.filter(el => el !== action.testCaseId)

        draft.data[action.assessmentId].elementsOfAssessment = draft.data[
          action.assessmentId
        ].elementsOfAssessment.filter(el => el !== action.testCaseId)
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_DELETE_TEST_CASE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_SUCCESS:
        draft.data[action.testCaseId] = {
          id: action.testCaseId,
          ...action.testCase,
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_CODE_COMPILING_UPDATE_TEST_CASE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.DELETE_ASSESSMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_ASSESSMENT_SUCCESS:
        assessmentPos = draft.data.assessments.findIndex(
          assessmentId => assessmentId === action.assessmentId,
        )
        draft.selectedAssessmentId = ''

        draft.selectedLearningStyleId = draft.data.learningStyles[0]
        draft.data.assessments.splice(assessmentPos, 1)
        draft.data[action.assessmentId].elementsOfAssessment.forEach(
          elementId => {
            delete draft.data[elementId]
          },
        )
        delete draft.data[action.assessmentId]

        draft.loading = false
        break
      case CONSTANTS.DELETE_ASSESSMENT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.FETCH_TEMPLATES_SUCCESS:
        action.templates.forEach(template => {
          draft.data[template.id] = { ...template }
          draft.data.templates.push(template.id)
        })

        draft.loading = false
        break
      case CONSTANTS.FETCH_TEMPLATES_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_TEMPLATE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_TEMPLATE_SUCCESS:
        draft.data[action.templateId] = {
          id: action.templateId,
          ...action.template,
        }
        draft.data.templates.push(action.templateId)
        draft.loading = false
        break
      case CONSTANTS.ADD_TEMPLATE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_TEMPLATE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_TEMPLATE_SUCCESS:
        draft.data[action.templateId] = {
          ...draft.data[action.templateId],
          ...action.template,
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_TEMPLATE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_TEMPLATE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_TEMPLATE_SUCCESS:
        templatePos = draft.data.templates.findIndex(
          templateId => templateId === action.templateId,
        )
        draft.data.templates.splice(templatePos, 1)
        delete draft.data[action.templateId]
        draft.loading = false
        break
      case CONSTANTS.DELETE_TEMPLATE_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_SUCCESS:
        draft.selectedAssessmentId = action.assessmentId

        draft.loading = false
        break
      case CONSTANTS.UPDATE_SELECTED_ASSESSMENT_ID_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_KEYWORD_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_KEYWORD_SUCCESS:
        draft.data[action.keywordId] = {
          id: action.keywordId,
          ...action.keyword,
        }
        draft.data.keywords.push(action.keywordId)

        draft.selectedKeywordId = ''

        draft.loading = false
        break
      case CONSTANTS.ADD_KEYWORD_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_KEYWORD_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_KEYWORD_SUCCESS:
        draft.data[action.keywordId] = {
          ...draft.data[action.keywordId],
          ...action.keyword,
        }
        draft.selectedKeywordId = ''

        draft.loading = false
        break
      case CONSTANTS.UPDATE_KEYWORD_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_KEYWORD_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_KEYWORD_SUCCESS:
        keywordPos = draft.data.keywords.findIndex(
          keywordId => keywordId === action.keywordId,
        )

        draft.data.keywords.splice(keywordPos, 1)
        delete draft.data[action.keywordId]

        draft.loading = false
        break
      case CONSTANTS.DELETE_KEYWORD_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_SUCCESS:
        draft.selectedKeywordId = action.keywordId
        draft.loading = false
        break
      case CONSTANTS.UPDATE_SELECTED_KEYWORD_ID_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_SUCCESS:
        draft.data[action.statementId] = {
          id: action.statementId,
          ...action.statement,
        }
        draft.data[action.assessmentId].statements.push(action.statementId)
        draft.data[action.assessmentId].elementsOfAssessment.push(
          action.statementId,
        )

        draft.loading = false
        break
      case CONSTANTS.ADD_REORDER_CHALLENGE_STATEMENT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_SUCCESS:
        draft.data[action.statementId] = {
          ...draft.data[action.statementId],
          ...action.statement,
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_REORDER_CHALLENGE_STATEMENT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_SUCCESS:
        statementPos = draft.data[action.assessmentId].statements.findIndex(
          statementId => statementId === action.statementId,
        )
        draft.data[action.assessmentId].statements.splice(statementPos, 1)

        statementPos = draft.data[
          action.assessmentId
        ].elementsOfAssessment.findIndex(
          statementId => statementId === action.statementId,
        )
        draft.data[action.assessmentId].elementsOfAssessment.splice(
          statementPos,
          1,
        )
        delete draft.data[action.statementId]

        draft.loading = false
        break
      case CONSTANTS.DELETE_REORDER_CHALLENGE_STATEMENT_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.ADD_QUIZ_QUESTION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_QUIZ_QUESTION_SUCCESS:
        draft.data[action.questionId] = {
          id: action.questionId,
          ...action.question,
        }
        draft.data[action.languageId] = {
          id: action.languageId,
          text: '',
        }
        draft.data[action.codeId] = {
          id: action.codeId,
          text: '',
        }
        draft.data[action.assessmentId].questions.push(action.questionId)
        draft.data[action.assessmentId].elementsOfAssessment.push(
          action.questionId,
        )
        draft.data[action.assessmentId].elementsOfAssessment.push(
          action.languageId,
        )
        draft.data[action.assessmentId].elementsOfAssessment.push(action.codeId)

        draft.loading = false
        break
      case CONSTANTS.ADD_QUIZ_QUESTION_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_QUIZ_QUESTION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_QUIZ_QUESTION_SUCCESS:
        draft.data[action.questionId] = {
          ...draft.data[action.questionId],
          ...action.question,
        }

        draft.loading = false
        break
      case CONSTANTS.UPDATE_QUIZ_QUESTION_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.DELETE_QUIZ_QUESTION_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_QUIZ_QUESTION_SUCCESS:
        questionPos = draft.data[action.assessmentId].questions.findIndex(
          questionId => questionId === action.questionId,
        )
        draft.data[action.assessmentId].questions.splice(questionPos, 1)

        questionPos = draft.data[
          action.assessmentId
        ].elementsOfAssessment.findIndex(
          questionId => questionId === action.questionId,
        )
        draft.data[action.assessmentId].elementsOfAssessment.splice(
          questionPos,
          1,
        )
        delete draft.data[action.questionId]

        draft.loading = false
        break

      case CONSTANTS.UPDATE_QUIZ_LANGUAGE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_QUIZ_LANGUAGE_SUCCESS:
        draft.data[action.languageId].text = action.text

        draft.loading = false
        break
      case CONSTANTS.UPDATE_QUIZ_LANGUAGE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_QUIZ_CODE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_QUIZ_CODE_SUCCESS:
        draft.data[action.codeId].text = action.text

        draft.loading = false
        break
      case CONSTANTS.UPDATE_QUIZ_CODE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.DELETE_QUIZ_QUESTION_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_QUIZ_CHOICE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_QUIZ_CHOICE_SUCCESS:
        draft.data[action.choiceId] = {
          id: action.choiceId,
          ...action.choice,
        }
        draft.data[action.questionId].choices.push(action.choiceId)
        draft.data[action.assessmentId].elementsOfAssessment.push(
          action.choiceId,
        )

        draft.loading = false
        break
      case CONSTANTS.ADD_QUIZ_CHOICE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_QUIZ_CHOICE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_QUIZ_CHOICE_SUCCESS:
        draft.data[action.choiceId] = {
          ...draft.data[action.choiceId],
          ...action.choice,
        }

        draft.loading = false
        break
      case CONSTANTS.UPDATE_QUIZ_CHOICE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.DELETE_QUIZ_CHOICE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_QUIZ_CHOICE_SUCCESS:
        choicePos = draft.data[action.questionId].choices.findIndex(
          choiceId => choiceId === action.choiceId,
        )
        draft.data[action.questionId].choices.splice(choicePos, 1)

        choicePos = draft.data[
          action.assessmentId
        ].elementsOfAssessment.findIndex(
          choiceId => choiceId === action.choiceId,
        )
        draft.data[action.assessmentId].elementsOfAssessment.splice(
          choicePos,
          1,
        )

        delete draft.data[action.choiceId]

        draft.loading = false
        break
      case CONSTANTS.DELETE_QUIZ_CHOICE_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.ADD_FIB_ELEMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_FIB_ELEMENT_SUCCESS:
        draft.data[action.elementId] = {
          id: action.elementId,
          ...action.element,
        }
        draft.data[action.assessmentId].elements.push(action.elementId)
        draft.data[action.assessmentId].elementsOfAssessment.push(
          action.elementId,
        )

        draft.loading = false
        break
      case CONSTANTS.ADD_FIB_ELEMENT_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.UPDATE_FIB_ELEMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_FIB_ELEMENT_SUCCESS:
        draft.data[action.elementId] = {
          ...draft.data[action.elementId],
          ...action.element,
        }

        draft.loading = false
        break
      case CONSTANTS.UPDATE_FIB_ELEMENT_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.DELETE_FIB_ELEMENT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_FIB_ELEMENT_SUCCESS:
        elementPos = draft.data[action.assessmentId].elements.findIndex(
          elementId => elementId === action.elementId,
        )
        draft.data[action.assessmentId].elements.splice(elementPos, 1)

        elementPos = draft.data[
          action.assessmentId
        ].elementsOfAssessment.findIndex(
          elementId => elementId === action.elementId,
        )
        draft.data[action.assessmentId].elementsOfAssessment.splice(
          elementPos,
          1,
        )

        delete draft.data[action.elementId]

        draft.loading = false
        break
      case CONSTANTS.DELETE_FIB_ELEMENT_FAILURE:
        draft.loading = false
        break
      case LIVESHARE_CONSTANTS.PATCH_RECEIVED_EVENT_SUCCESS:
        draft.trackChanges = false
        patchedData = patch(draft.data, action.patch)
        draft.data = JSON.parse(patchedData)

        if (
          draft.selectedLearningStyleId === '' &&
          draft.selectedAssessmentId === '' &&
          draft.data.learningStyles !== null &&
          draft.data.learningStyles.length > 0
        ) {
          draft.selectedLearningStyleId = draft.data.learningStyles[0]
          if (
            draft.data[draft.selectedLearningStyleId] !== null &&
            draft.data[draft.selectedLearningStyleId].pages !== null &&
            draft.data[draft.selectedLearningStyleId].pages.length > 0
          )
            draft.selectedPageId =
              draft.data[draft.selectedLearningStyleId].pages[0]
        }
        // uniqueness fix
        draft.data.learningStyles = uniq(draft.data.learningStyles)
        draft.data.learningStyles.map(ls => {
          draft.data[ls].pages = uniq(draft.data[ls].pages)
        })
        break
      case LIVESHARE_CONSTANTS.SET_CHANGE_TRACKING_SUCCESS:
        draft.trackChanges = action.trackChanges
        break

      case LIVESHARE_CONSTANTS.LOAD_SKILL_INSTANCE_SUCCESS:
        draft.trackChanges = false
        draft.data = {
          ...draft.data,
          ...adaptContent(JSON.parse(action.instance.skill)),
        }
        draft.replicatedPages = action.instance.pageOperations
        draft.crdtInformation = action.instance.crdtInformation
        if (
          draft.data.learningStyles !== null &&
          draft.data.learningStyles.length > 0
        ) {
          draft.data.learningStyles.map(ls => {
            if (
              draft.data[ls] !== null &&
              draft.data[ls].pages !== null &&
              draft.data[ls].pages.length > 0
            )
              draft.data[ls].pages.map(pageId => {
                if (
                  draft.replicatedPages[pageId] === undefined ||
                  draft.replicatedPages[pageId] == null
                )
                  draft.replicatedPages[pageId] = []
              })
          })
          draft.selectedLearningStyleId = draft.data.learningStyles[0]
          if (
            draft.data[draft.selectedLearningStyleId] !== null &&
            draft.data[draft.selectedLearningStyleId].pages !== null &&
            draft.data[draft.selectedLearningStyleId].pages.length > 0
          )
            draft.selectedPageId =
              draft.data[draft.selectedLearningStyleId].pages[0]
        }
        // uniqueness fix
        draft.data.learningStyles = uniq(draft.data.learningStyles)
        draft.data.learningStyles.map(ls => {
          draft.data[ls].pages = uniq(draft.data[ls].pages)
        })
        break
      case LIVESHARE_CONSTANTS.ADD_CONTENT_OPERATIONS_SUCCESS:
        if (
          draft.replicatedPages[action.pageId] !== undefined &&
          draft.replicatedPages[action.pageId] !== null
        )
          draft.replicatedPages[action.pageId].push(...action.operations)
        else draft.replicatedPages[action.pageId] = [...action.operations]
        break
      case CONSTANTS.UPDATE_SELECTED_PAGE_ID_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_SELECTED_PAGE_ID_SUCCESS:
        draft.selectedPageId = action.pageId
        draft.loading = false
        break
      case LIVESHARE_CONSTANTS.SET_PAGE_CONTENT_SUCCESS:
        draft.data[action.pageId].content = action.content
        break
      case CONSTANTS.UPDATE_SELECTED_PAGE_ID_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.LOAD_SIMULATED_NODES_SUCCESS:
        draft.data.simulatedNodes = action.nodes
        break
      case LIVESHARE_CONSTANTS.COLLABORATOR_LEFT_EVENT_SUCCESS:
        draft.selections[action.collaborator.id] = undefined
        break
      case LIVESHARE_CONSTANTS.ADD_USER_SELECTION_SUCCESS:
        draft.selections[action.collaborator.id] = {
          id: action.id,
          collaborator: action.collaborator,
        }
        break
      case CONSTANTS.SET_DID_UPDATE_SUCCESS:
        draft.didUpdate = action.didUpdate
        break
    }
  })

export default editorReducer
