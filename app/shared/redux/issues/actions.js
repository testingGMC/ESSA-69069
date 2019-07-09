/*
 *
 * Issues actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchIssues() {
  return {
    type: CONSTANTS.FETCH_ISSUES_REQUEST,
  }
}

export function updateStatus(issueId, issue) {
  return {
    type: CONSTANTS.UPDATE_STATUS_REQUEST,
    issueId,
    issue,
  }
}

export const setIsMarkAsModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_MARK_AS_MODAL_VISIBLE_REQUEST,
  isVisible,
})
export const setIsAssignToProjectModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_ASSIGN_TO_PROJECT_MODAL_VISIBLE_REQUEST,
  isVisible,
})
