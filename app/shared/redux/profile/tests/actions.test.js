import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('setRoles action', () => {
  it('has a type of SET_ROLES_REQUEST', () => {
    const expected = {
      type: CONSTANTS.SET_ROLES_REQUEST,
    }
    expect(ACTIONS.setRoles()).toEqual(expected)
  })
})
