import * as ACTIONS from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchGraph action', () => {
  it('has a type of FETCH_GRAPH_REQUEST', () => {
    const expected = {
      type: CONSTANTS.FETCH_GRAPH_REQUEST,
    }
    expect(ACTIONS.fetchGraph()).toEqual(expected)
  })
})

describe('createNode action', () => {
  it('has a type of CREATE_NODE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.CREATE_NODE_REQUEST,
    }
    expect(ACTIONS.createNode()).toEqual(expected)
  })
})

describe('updateNode action', () => {
  it('has a type of UPDATE_NODE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_NODE_REQUEST,
    }
    expect(ACTIONS.updateNode()).toEqual(expected)
  })
})

describe('deleteNode action', () => {
  it('has a type of DELETE_NODE_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_NODE_REQUEST,
    }
    expect(ACTIONS.deleteNode()).toEqual(expected)
  })
})

describe('createOrUpdateDependency action', () => {
  it('has a type of CREATE_DEPENDENCY_REQUEST', () => {
    const expected = {
      type: CONSTANTS.CREATE_DEPENDENCY_REQUEST,
    }
    expect(ACTIONS.createOrUpdateDependency()).toEqual(expected)
  })
})

describe('updateDependency action', () => {
  it('has a type of UPDATE_DEPENDENCY_REQUEST', () => {
    const expected = {
      type: CONSTANTS.UPDATE_DEPENDENCY_REQUEST,
    }
    expect(ACTIONS.updateDependency()).toEqual(expected)
  })
})

describe('deleteDependency action', () => {
  it('has a type of DELETE_DEPENDENCY_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DELETE_DEPENDENCY_REQUEST,
    }
    expect(ACTIONS.deleteDependency()).toEqual(expected)
  })
})

describe('loadSimulatedGraph action', () => {
  it('has a type of LOAD_SIMULATED_GRAPH', () => {
    const expected = {
      type: CONSTANTS.LOAD_SIMULATED_GRAPH,
    }
    expect(ACTIONS.loadSimulatedGraph()).toEqual(expected)
  })
})

describe('updateSimulationNode action', () => {
  it('has a type of UPDATE_SIMULATION_NODE', () => {
    const expected = {
      type: CONSTANTS.UPDATE_SIMULATION_NODE,
    }
    expect(ACTIONS.updateSimulationNode()).toEqual(expected)
  })
})

describe('duplicateNode action', () => {
  it('has a type of DUPLICATE_SKILL_REQUEST', () => {
    const expected = {
      type: CONSTANTS.DUPLICATE_SKILL_REQUEST,
    }
    expect(ACTIONS.duplicateNode()).toEqual(expected)
  })
})

describe('resetSimulation action', () => {
  it('has a type of RESET_SIMULATION', () => {
    const expected = {
      type: CONSTANTS.RESET_SIMULATION,
    }
    expect(ACTIONS.resetSimulation()).toEqual(expected)
  })
})

describe('finishSimulation action', () => {
  it('has a type of FINISH_SIMULATION', () => {
    const expected = {
      type: CONSTANTS.FINISH_SIMULATION,
    }
    expect(ACTIONS.finishSimulation()).toEqual(expected)
  })
})

describe('applyPBro action', () => {
  it('has a type of APPLY_PBRO_REQUEST', () => {
    const expected = {
      type: CONSTANTS.APPLY_PBRO_REQUEST,
    }
    expect(ACTIONS.applyPBro()).toEqual(expected)
  })
})

describe('applyReversePBro action', () => {
  it('has a type of APPLY_REVERSE_PBRO_REQUEST', () => {
    const expected = {
      type: CONSTANTS.APPLY_REVERSE_PBRO_REQUEST,
    }
    expect(ACTIONS.applyReversePBro()).toEqual(expected)
  })
})

describe('magnify action', () => {
  it('has a type of MAGNIFY_REQUEST', () => {
    const expected = {
      type: CONSTANTS.MAGNIFY_REQUEST,
    }
    expect(ACTIONS.magnify()).toEqual(expected)
  })
})