import * as actions from '../actions'
import * as CONSTANTS from '../constants'

describe('Sprints actions', () => {
  describe('fetchSprints', () => {
    it('should return an action with FETCH_SPRINTS_REQUEST as type and projectId as payload data ', () => {
      const projectId = '1'
      const expected = {
        type: CONSTANTS.FETCH_SPRINTS_REQUEST,
        projectId,
      }
      expect(actions.fetchSprints(projectId)).toEqual(expected)
    })
  })
})
