
import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetch tree action', () => {
  it('has a type of FETCH_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_TREES_REQUEST,
    }
    expect(ACTIONS.fetchTrees()).toEqual(expected)
  })
})

describe('send tree action', () => {
  it('has a type of SEND_ACTION', () => {
    const expected = {
      type: CONSTANTS.SEND_TREES_REQUEST,
    }
    expect(ACTIONS.sendTree()).toEqual(expected)
  })
})