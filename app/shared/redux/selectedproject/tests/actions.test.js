import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetch projectById action', () => {
  it('has a type of FETCH_PROJECT_BY_ID_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_PROJECT_BY_ID_REQUEST,
    }
    expect(ACTIONS.fetchProjectById()).toEqual(expected)
  })
})

describe('fetchProjectStatsById action', () => {
  it('has a type of FETCH_PROJECT_STATS_BY_ID_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_PROJECT_STATS_BY_ID_REQUEST,
    }
    expect(ACTIONS.fetchProjectStatsById()).toEqual(expected)
  })
})

describe('addMember action', () => {
  it('has a type of ADD_PROJECT_MEMBER_REQUEST', () => {
    const expected = {
      type: CONSTANTS.ADD_PROJECT_MEMBER_REQUEST,
    }
    expect(ACTIONS.addMember()).toEqual(expected)
  })
})

describe('deleteMember action', () => {
  it('has a type of DELETE_PROJECT_MEMBER_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_PROJECT_MEMBER_REQUEST,
    }
    expect(ACTIONS.deleteMember()).toEqual(expected)
  })
})

describe('updateProject action', () => {
  it('has a type of UPDATE_PROJECT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_PROJECT_REQUEST,
    }
    expect(ACTIONS.updateProject()).toEqual(expected)
  })
})
