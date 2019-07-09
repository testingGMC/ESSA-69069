/*
 *
 * Projects actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchProjects() {
  return {
    type: CONSTANTS.FETCH_PROJECTS_REQUEST,
  }
}

export function addProject(project) {
  return {
    type: CONSTANTS.ADD_PROJECT_REQUEST,
    project,
  }
}
export function deleteProject(id) {
  return {
    type: CONSTANTS.DELETE_PROJECT_REQUEST,
    id,
  }
}
export function updateProject(id, project) {
  return {
    type: CONSTANTS.UPDATE_PROJECT_REQUEST,
    id,
    project,
  }
}
export const setIsVisible = isVisible => ({
  type: CONSTANTS.SET_IS_VISIBLE_REQUEST,
  isVisible,
})
export const setIsUpdateModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_REQUEST,
  isVisible,
})
