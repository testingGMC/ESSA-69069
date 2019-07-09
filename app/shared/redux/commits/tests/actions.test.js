
import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchCommits action', () => {
  it('has a type of FETCH_COMMITS_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_COMMITS_REQUEST,
    }
    expect(ACTIONS.fetchCommits()).toEqual(expected)
  })
})

describe('fetchLatestCommits action', () => {
  it('has a type of FETCH_LATEST_COMMITS_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_LATEST_COMMITS_REQUEST,
    }
    expect(ACTIONS.fetchLatestCommits()).toEqual(expected)
  })
})

describe('revertToACommit action', () => {
  it('has a type of REVERT_COMMIT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.REVERT_COMMIT_REQUEST,
    }
    expect(ACTIONS.revertToACommit()).toEqual(expected)
  })
})