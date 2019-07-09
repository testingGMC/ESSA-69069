/*
 *
 * Sprints actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchSprintsFirstTime(projectId) {
  return {
    type: CONSTANTS.FETCH_SPRINTS_FIRST_TIME_REQUEST,
    projectId,
  }
}
export function fetchSprints(projectId) {
  return {
    type: CONSTANTS.FETCH_SPRINTS_REQUEST,
    projectId,
  }
}

export function addSprint(sprint) {
  return {
    type: CONSTANTS.ADD_SPRINT_REQUEST,
    sprint,
  }
}

export function fetchWorkItems(sprintId) {
  return {
    type: CONSTANTS.FETCH_WORK_ITEMS_REQUEST,
    sprintId,
  }
}

export function addWorkItem(workItem) {
  return {
    type: CONSTANTS.ADD_WORK_ITEM_REQUEST,
    workItem,
  }
}

export function updateWorkItem(sprintId, workItemId, workItem) {
  return {
    type: CONSTANTS.UPDATE_WORK_ITEM_REQUEST,
    oldSprintId: sprintId,
    workItemId,
    workItem,
  }
}

export function deleteWorkItem(sprintId, workItemId) {
  return {
    type: CONSTANTS.DELETE_WORK_ITEM_REQUEST,
    sprintId,
    workItemId,
  }
}

export function updateWorkItemState(sprintId, workItemId, workItem) {
  return {
    type: CONSTANTS.UPDATE_WORK_ITEM_STATE_REQUEST,
    sprintId,
    workItemId,
    workItem,
  }
}

export const setIsAddWorkItemModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_ADD_WORK_ITEM_MODAL_VISIBLE_REQUEST,
  isVisible,
})
export const setIsUpdateWorkItemModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_UPDATE_WORK_ITEM_MODAL_VISIBLE_REQUEST,
  isVisible,
})
export const setIsAddSprintModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_ADD_SPRINT_MODAL_VISIBLE_REQUEST,
  isVisible,
})
