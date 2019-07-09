
import produce from 'immer'
import editorReducer from '../reducer'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

/* eslint-disable default-case, no-param-reassign */
describe('editorReducer', () => {
    let state
    beforeEach(() => {
        state = {
            loading: false,
            selectedLearningStyleId: '',
            selectedAssessmentId: '',
            selectedKeywordId: '',
            selectedPageId: '',
            didUpdate: false,
            trackChanges: true,
            replicatedPages: {},
            data: {
                learningStyles: [],
                assessments: [],
                keywords: [],
                templates: [],
                simulatedNodes: [],
            },
        }
    })

    it('returns the initial state', () => {
        const expectedResult = state
        expect(editorReducer(undefined, {})).toEqual(expectedResult)
    })

    it('should handle the FETCH_SKILL_REQUEST action correctly', () => {
        const expectedResult = produce(state, draft => {
            draft.loading = true
        })
        expect(editorReducer(state, actions.fetchSkill())).toEqual(
            expectedResult,
        )
    })
})