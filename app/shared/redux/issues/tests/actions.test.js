import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchIssues action', () => {
  it('has a type of FETCH_ISSUES_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_ISSUES_REQUEST,
    }
    expect(ACTIONS.fetchIssues()).toEqual(expected)
  })
})

describe('updateStatus action', () => {
  it('has a type of UPDATE_STATUS_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_STATUS_REQUEST,
    }
    expect(ACTIONS.updateStatus()).toEqual(expected)
  })
})