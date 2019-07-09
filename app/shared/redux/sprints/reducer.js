/*
 *
 * Sprints reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {
  selectedSprintId: '',
  loading: false,
  isAddWorkItemModalVisible: false,
  isUpdateWorkItemModalVisible: false,
  isAddSprintModalVisible: false,
}

/* eslint-disable default-case, no-param-reassign */
const sprintsReducer = (state = initialState, action) =>
  produce(state, draft => {
    let workItemPos
    let workItem
    let newWorkItems
    switch (action.type) {
      case CONSTANTS.FETCH_SPRINTS_REQUEST:
      case CONSTANTS.FETCH_SPRINTS_FIRST_TIME_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_SPRINTS_SUCCESS:
        draft.data = action.sprints

        draft.loading = false
        break
      case CONSTANTS.FETCH_SPRINTS_FIRST_TIME_SUCCESS:
        draft.data = action.sprints
        draft.selectedSprintId = ''

        draft.loading = false
        break
      case CONSTANTS.FETCH_SPRINTS_FAILURE:
      case CONSTANTS.FETCH_SPRINTS_FIRST_TIME_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false
        break
      case CONSTANTS.ADD_SPRINT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_SPRINT_SUCCESS:
        if (!draft.data) {
          draft.data = []
        }
        draft.data.push(action.sprint)
        draft.selectedSprintId = action.sprint.id
        draft.isAddSprintModalVisible = false
        draft.loading = false
        break
      case CONSTANTS.ADD_SPRINT_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false

        break
      case CONSTANTS.FETCH_WORK_ITEMS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_WORK_ITEMS_SUCCESS:
        draft.data = draft.data.map(d => {
          if (d.id === action.sprintId) {
            d.workItems = action.workItems
          }
          return d
        })
        draft.selectedSprintId = action.sprintId

        draft.loading = false
        break
      case CONSTANTS.FETCH_WORK_ITEMS_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false
        break
      case CONSTANTS.ADD_WORK_ITEM_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_WORK_ITEM_SUCCESS:
        draft.data = draft.data.map(sprint => {
          if (sprint.id === action.sprintId) {
            if (!sprint.workItems) {
              return {
                ...sprint,
                workItems: [action.workItem],
              }
            }
            return {
              ...sprint,
              workItems: sprint.workItems.concat(action.workItem),
            }
          }
          return sprint
        })
        draft.isAddWorkItemModalVisible = false
        draft.loading = false
        break
      case CONSTANTS.ADD_WORK_ITEM_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_WORK_ITEM_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_WORK_ITEM_SUCCESS:
        draft.data = draft.data.map(sprint => {
          if (sprint.id === action.oldSprintId) {
            workItemPos = sprint.workItems.findIndex(
              w => w.id === action.workItemId,
            )

            if (sprint.id === action.workItem.sprintId) {
              workItem = sprint.workItems.find(w => w.id === action.workItemId)
              workItem = { ...workItem, ...action.workItem }
              newWorkItems = sprint.workItems.slice(0)
              newWorkItems.splice(workItemPos, 1, workItem)
              return {
                ...sprint,
                workItems: newWorkItems,
              }
            }
            return {
              ...sprint,
              workItems: sprint.workItems.filter(
                wk => wk.id !== action.workItemId,
              ),
            }
          }
          if (
            sprint.id === action.workItem.sprintId &&
            sprint.id !== action.oldSprintId
          ) {
            if (!sprint.workItems) {
              const newSprint = {
                ...sprint,
                workItems: [{ ...action.workItem }],
              }
              return newSprint
            }
            return {
              ...sprint,
              workItems: sprint.workItems.concat(action.workItem),
            }
          }
          return sprint
        })
        draft.isUpdateWorkItemModalVisible = false
        draft.loading = false
        break
      case CONSTANTS.UPDATE_WORK_ITEM_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false
        break
      case CONSTANTS.DELETE_WORK_ITEM_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_WORK_ITEM_SUCCESS:
        draft.data = draft.data.map(d => {
          if (d.id === action.sprintId) {
            workItemPos = d.workItems.findIndex(w => w.id === action.workItemId)
            d.workItems.splice(workItemPos, 1)
          }
          return d
        })

        draft.loading = false
        break
      case CONSTANTS.DELETE_WORK_ITEM_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_WORK_ITEM_STATE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_WORK_ITEM_STATE_SUCCESS:
        draft.data = draft.data.map(d => {
          if (d.id === action.sprintId) {
            workItemPos = d.workItems.findIndex(w => w.id === action.workItemId)
            workItem = d.workItems.find(w => w.id === action.workItemId)
            workItem = { ...workItem, ...action.workItem }
            d.workItems.splice(workItemPos, 1, workItem)
          }
          return d
        })

        draft.loading = false
        break
      case CONSTANTS.UPDATE_WORK_ITEM_STATE_FAILURE:
        if (action.errors) {
          draft.errors = action.errors
        }
        draft.loading = false
        break
      case CONSTANTS.CLEAR_ERRORS:
        draft.errors = []
        break
      case CONSTANTS.SET_IS_ADD_WORK_ITEM_MODAL_VISIBLE_SUCCESS:
        draft.isAddWorkItemModalVisible = action.isVisible
        break
      case CONSTANTS.SET_IS_UPDATE_WORK_ITEM_MODAL_VISIBLE_SUCCESS:
        draft.isUpdateWorkItemModalVisible = action.isVisible
        break
      case CONSTANTS.SET_IS_ADD_SPRINT_MODAL_VISIBLE_SUCCESS:
        draft.isAddSprintModalVisible = action.isVisible
        break
    }
  })

export default sprintsReducer
