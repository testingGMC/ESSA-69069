

import produce from 'immer'
import projectsReducer from '../reducer'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

describe('projectsReducer', () => {
  let state
  beforeEach(() => {
    state = {}
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(projectsReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should handle the FETCH_PROJECTS_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(projectsReducer(state, actions.fetchProjects())).toEqual(
      expectedResult,
    )
  })

  it('should handle the FETCH_PROJECTS_SUCCESS action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.FETCH_PROJECTS_SUCCESS,
    }
    expect(projectsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the FETCH_PROJECTS_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.FETCH_PROJECTS_FAILURE,
    }
    expect(projectsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the ADD_PROJECT_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    const project = {
      id: '1',
      name: 'project 1',
    }
    expect(projectsReducer(state, actions.addProject(project))).toEqual(
      expectedResult,
    )
  })



  it('should handle the ADD_PROJECT_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.ADD_PROJECT_FAILURE,
    }
    expect(projectsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the DELETE_PROJECT_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(projectsReducer(state, actions.deleteProject())).toEqual(
      expectedResult,
    )
  })


  it('should handle the DELETE_PROJECT_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.DELETE_PROJECT_FAILURE,
    }
    expect(projectsReducer(state, action)).toEqual(expectedResult)
  })
})