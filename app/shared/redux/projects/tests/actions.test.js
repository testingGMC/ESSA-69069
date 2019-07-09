import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchProjects action', () => {
  it('has a type of FETCH_PROJECTS_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_PROJECTS_REQUEST,
    }
    expect(ACTIONS.fetchProjects()).toEqual(expected)
  })
})

describe('addProject action', () => {
  it('has a type of ADD_PROJECT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_PROJECT_REQUEST,
    }
    expect(ACTIONS.addProject()).toEqual(expected)
  })
})

describe('deleteProject action', () => {
  it('has a type of DELETE_PROJECT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_PROJECT_REQUEST,
    }
    expect(ACTIONS.deleteProject()).toEqual(expected)
  })
})