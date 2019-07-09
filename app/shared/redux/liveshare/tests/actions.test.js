import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('createHubConnection action', () => {
  it('has a type of HUB_CONNECTION_REQUEST', () => {
    const expected = {
      type: CONSTANTS.HUB_CONNECTION_REQUEST,
    }
    expect(ACTIONS.createHubConnection()).toEqual(expected)
  })
})

describe('createOrLoadSkillInstance action', () => {
  it('has a type of LOAD_SKILL_INSTANCE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.LOAD_SKILL_INSTANCE_REQUEST,
    }
    expect(ACTIONS.createOrLoadSkillInstance()).toEqual(expected)
  })
})

describe('closeOrUnloadSkillInstance action', () => {
  it('has a type of UNLOAD_SKILL_INSTANCE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UNLOAD_SKILL_INSTANCE_REQUEST,
    }
    expect(ACTIONS.closeOrUnloadSkillInstance()).toEqual(expected)
  })
})

describe('collaboratorJoined action', () => {
  it('has a type of COLLABORATOR_JOINED_EVENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.COLLABORATOR_JOINED_EVENT_REQUEST,
    }
    expect(ACTIONS.collaboratorJoined()).toEqual(expected)
  })
})

describe('collaboratorLeft action', () => {
  it('has a type of COLLABORATOR_LEFT_EVENT_REQUEST', () => {
    const expected = {
      type: CONSTANTS.COLLABORATOR_LEFT_EVENT_REQUEST,
    }
    expect(ACTIONS.collaboratorLeft()).toEqual(expected)
  })
})