import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchSkills action', () => {
  it('has a type of FETCH_SKILLS_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_SKILLS_REQUEST,
    }
    expect(ACTIONS.fetchSkills()).toEqual(expected)
  })
})