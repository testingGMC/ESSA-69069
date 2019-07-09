/*
 *
 * Projects reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {
  isVisible: false,
}

/* eslint-disable default-case, no-param-reassign */
const projectsReducer = (state = initialState, action) =>
  produce(state, draft => {
    let projectPos
    switch (action.type) {
      case CONSTANTS.FETCH_PROJECTS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_PROJECTS_SUCCESS:
        draft.data = action.projects
        draft.loading = false
        break
      case CONSTANTS.FETCH_PROJECTS_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.ADD_PROJECT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.ADD_PROJECT_SUCCESS:
        draft.data.push(action.project)
        draft.loading = false
        draft.isVisible = false
        break
      case CONSTANTS.ADD_PROJECT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.DELETE_PROJECT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_PROJECT_SUCCESS:
        projectPos = draft.data.findIndex(p => p.id === action.projectId)
        draft.data.splice(projectPos, 1)
        draft.loading = false
        break
      case CONSTANTS.DELETE_PROJECT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.SET_IS_VISIBLE_SUCCESS:
        draft.isVisible = action.isVisible
        break
      case CONSTANTS.UPDATE_PROJECT_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_PROJECT_SUCCESS:
        let x = draft.data.findIndex(project => project.id === action.project.id)
        draft.data[x] = action.project
        draft.isUpdateModalVisible = false
        draft.loading = false
        break
      case CONSTANTS.UPDATE_PROJECT_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_SUCCESS:
        draft.isUpdateModalVisible = action.isVisible
        break

    }
  })

export default projectsReducer
