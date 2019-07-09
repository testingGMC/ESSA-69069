import produce from 'immer'
import sprintsReducer from '../reducer'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

/* eslint-disable default-case, no-param-reassign */
describe('sprintsReducer', () => {
  let state
  beforeEach(() => {
    state = { selectedSprintId: '', loading: false }
  })

  it('returns the initial state', () => {
    const expectedResult = state
    expect(sprintsReducer(undefined, {})).toEqual(expectedResult)
  })

  it('should handle the FETCH_SPRINTS_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.fetchSprints())).toEqual(
      expectedResult,
    )
  })

  it('should handle the FETCH_SPRINTS_SUCCESS action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.errors = []
      draft.data = [{ id: '1', name: 'Sprint 1' }]
    })
    const action = {
      type: CONSTANTS.FETCH_SPRINTS_SUCCESS,
      sprints: [{ id: '1', name: 'Sprint 1' }],
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the FETCH_SPRINTS_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.FETCH_SPRINTS_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the ADD_SPRINT_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    const sprint = {
      id: '1',
      name: 'Sprint 1',
    }
    expect(sprintsReducer(state, actions.addSprint(sprint))).toEqual(
      expectedResult,
    )
  })

  it('should handle the ADD_SPRINT_SUCCESS action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.errors = []
      draft.selectedSprintId = "1"
      draft.data = [{ id: '1', name: 'Sprint 1' }]
    })
    const action = {
      type: CONSTANTS.ADD_SPRINT_SUCCESS,
      sprint: { id: '1', name: 'Sprint 1' },
    }


    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the ADD_SPRINT_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.ADD_SPRINT_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the FETCH_WORK_ITEMS_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.fetchWorkItems())).toEqual(
      expectedResult,
    )
  })

  it('should handle the FETCH_WORK_ITEMS_SUCCESS action correctly', () => {
    state = {
      selectedSprintId: '1',
      errors: [],
      loading: false,
      data: [{ id: '1', name: 'Sprint 1' }],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [{ id: '1', name: 'Task 1' }],
        },
      ]
      draft.selectedSprintId = '1'
    })

    const action = {
      type: CONSTANTS.FETCH_WORK_ITEMS_SUCCESS,
      workItems: [{ id: '1', name: 'Task 1' }],
      sprintId: '1',
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the FETCH_WORK_ITEMS_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.FETCH_WORK_ITEMS_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the ADD_WORK_ITEM_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.addWorkItem())).toEqual(expectedResult)
  })

  it('should handle the ADD_WORK_ITEM_SUCCESS action  correctly when sprint has no workItems', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [{ id: '1', name: 'Sprint 1' }],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [{ id: '1', name: 'Task 1' }],
        },
      ]
    })

    const action = {
      type: CONSTANTS.ADD_WORK_ITEM_SUCCESS,
      workItem: { id: '1', name: 'Task 1' },
      sprintId: '1',
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the ADD_WORK_ITEM_SUCCESS action  correctly when sprint has at least one workItem', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        { id: '1', name: 'Sprint 1', workItems: [{ id: '1', name: 'Task 1' }] },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [{ id: '1', name: 'Task 1' }, { id: '2', name: 'Task 2' }],
        },
      ]
    })

    const action = {
      type: CONSTANTS.ADD_WORK_ITEM_SUCCESS,
      workItem: { id: '2', name: 'Task 2' },
      sprintId: '1',
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the ADD_WORK_ITEM_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.ADD_WORK_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.fetchSprints())).toEqual(
      expectedResult,
    )
  })

  it('should handle the UPDATE_WORK_ITEM_SUCCESS action correctly when the work item type is updated', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '1' },
          ],
        },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 1, sprintId: '1' },
          ],
        },
      ]
    })

    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_SUCCESS,
      oldSprintId: '1',
      workItemId: '2',

      workItem: { id: '2', name: 'Task 2', type: 1, sprintId: '1' },
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_SUCCESS action correctly when the work item sprintId is updated', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '1' },
          ],
        },
        {
          id: '2',
          name: 'Sprint 2',
          workItems: [
            { id: '3', name: 'Task 3', type: 0, sprintId: '2' },
            { id: '4', name: 'Task 4', type: 0, sprintId: '2' },
          ],
        },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.errors = []
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [{ id: '1', name: 'Task 1', type: 0, sprintId: '1' }],
        },
        {
          id: '2',
          name: 'Sprint 2',
          workItems: [
            { id: '3', name: 'Task 3', type: 0, sprintId: '2' },
            { id: '4', name: 'Task 4', type: 0, sprintId: '2' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '2' },
          ],
        },
      ]
    })

    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_SUCCESS,
      oldSprintId: '1',
      workItemId: '2',

      workItem: { id: '2', name: 'Task 2', type: 0, sprintId: '2' },
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.fetchSprints())).toEqual(
      expectedResult,
    )
  })

  it('should handle the UPDATE_WORK_ITEM_SUCCESS action correctly when the work item type is updated', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '1' },
          ],
        },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 1, sprintId: '1' },
          ],
        },
      ]
    })

    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_SUCCESS,
      oldSprintId: '1',
      workItemId: '2',

      workItem: { id: '2', name: 'Task 2', type: 1, sprintId: '1' },
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_SUCCESS action correctly when the work item sprintId is updated', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '1' },
          ],
        },
        {
          id: '2',
          name: 'Sprint 2',
          workItems: [
            { id: '3', name: 'Task 3', type: 0, sprintId: '2' },
            { id: '4', name: 'Task 4', type: 0, sprintId: '2' },
          ],
        },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [{ id: '1', name: 'Task 1', type: 0, sprintId: '1' }],
        },
        {
          id: '2',
          name: 'Sprint 2',
          workItems: [
            { id: '3', name: 'Task 3', type: 0, sprintId: '2' },
            { id: '4', name: 'Task 4', type: 0, sprintId: '2' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '2' },
          ],
        },
      ]
    })

    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_SUCCESS,
      oldSprintId: '1',
      workItemId: '2',

      workItem: { id: '2', name: 'Task 2', type: 0, sprintId: '2' },
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the DELETE_WORK_ITEM_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.deleteWorkItem())).toEqual(
      expectedResult,
    )
  })

  it('should handle the DELETE_WORK_ITEM_SUCCESS action correctly', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 0, sprintId: '1' },
          ],
        },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [{ id: '1', name: 'Task 1', type: 0, sprintId: '1' }],
        },
      ]
    })

    const action = {
      type: CONSTANTS.DELETE_WORK_ITEM_SUCCESS,
      sprintId: '1',
      workItemId: '2',
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the DELETE_WORK_ITEM_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.DELETE_WORK_ITEM_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_STATE_REQUEST action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = true
    })
    expect(sprintsReducer(state, actions.deleteWorkItem())).toEqual(
      expectedResult,
    )
  })

  it('should handle the UPDATE_WORK_ITEM_STATE_SUCCESS action correctly', () => {
    state = {
      selectedSprintId: '1',
      loading: false,
      errors: [],
      data: [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', state: 0, type: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', state: 0, type: 0, sprintId: '1' },
          ],
        },
      ],
    }
    const expectedResult = produce(state, draft => {
      draft.loading = false
      draft.data = [
        {
          id: '1',
          name: 'Sprint 1',
          workItems: [
            { id: '1', name: 'Task 1', type: 0, state: 0, sprintId: '1' },
            { id: '2', name: 'Task 2', type: 0, state: 3, sprintId: '1' },
          ],
        },
      ]
    })

    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_STATE_SUCCESS,
      sprintId: '1',
      workItemId: '2',
      workItem: { id: '2', name: 'Task 2', type: 0, state: 3, sprintId: '1' },
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })

  it('should handle the UPDATE_WORK_ITEM_STATE_FAILURE action correctly', () => {
    const expectedResult = produce(state, draft => {
      draft.loading = false
    })
    const action = {
      type: CONSTANTS.UPDATE_WORK_ITEM_STATE_FAILURE,
    }
    expect(sprintsReducer(state, action)).toEqual(expectedResult)
  })
})
