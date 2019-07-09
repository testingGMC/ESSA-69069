import * as CONSTANTS from './constants'

export function fetchProjectById(projectId) {
  return {
    type: CONSTANTS.FETCH_PROJECT_BY_ID_REQUEST,
    projectId,
  }
}

export function fetchProjectStatsById(projectId) {
  return {
    type: CONSTANTS.FETCH_PROJECT_STATS_BY_ID_REQUEST,
    projectId,
  }
}

export function fetchProjectMembersByProjectId(projectId) {
  return {
    type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_REQUEST,
    projectId,
  }
}

export function fetchProjectMembersByFilter(filter) {
  return {
    type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_REQUEST,
    filter,
  }
}

export function addMember(member) {
  return {
    type: CONSTANTS.ADD_PROJECT_MEMBER_REQUEST,
    member,
  }
}

export function deleteMember(memberId) {
  return {
    type: CONSTANTS.DELETE_PROJECT_MEMBER_REQUEST,
    memberId,
  }
}

export function updateProject(projectId, project) {
  return {
    type: CONSTANTS.UPDATE_PROJECT_REQUEST,
    projectId,
    project,
  }
}

export const setIsAddMemberModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_ADD_MEMBER_MODAL_VISIBLE_REQUEST,
  isVisible,
})
export const setIsUpdateModalVisible = isVisible => ({
  type: CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_REQUEST,
  isVisible,
})
