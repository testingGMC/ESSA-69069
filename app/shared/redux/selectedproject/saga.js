import { put, takeEvery, all, call, take } from 'redux-saga/effects'
import * as api from 'shared/services/project.service'
import * as CONSTANTS from './constants'
const delay = ms => new Promise(res => setTimeout(res, ms))

// Individual exports for testing
export function* fetchProjectById(action) {
  try {
    const data = yield call(api.fetchProjectById, action.projectId)
    yield put({
      type: CONSTANTS.FETCH_PROJECT_BY_ID_SUCCESS,
      project: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_PROJECT_BY_ID_FAILURE, e })
  }
}

export function* fetchProjectStatsById(action) {
  try {
    const data = yield call(api.fetchProjectStatsById, action.projectId)
    yield put({
      type: CONSTANTS.FETCH_PROJECT_STATS_BY_ID_SUCCESS,
      numbers: data.model,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({ type: CONSTANTS.FETCH_PROJECT_STATS_BY_ID_FAILURE, e })
  }
}

export function* fetchProjectMembersByProjectId(action) {
  try {
    const data = yield call(api.fetchMembersByProjectId, action.projectId)
    yield put({
      type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_SUCCESS,
      members: data.model,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({
      type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_FAILURE,
      e,
    })
  }
}

export function* fetchProjectMembersByFilter(action) {
  try {
    const data = yield call(api.fetchMembersByNameOrEmail, action.projectId)
    yield put({
      type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_FILTER_SUCCESS,
      numbers: data.model,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({ type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_FILTER_FAILURE, e })
  }
}

export function* addMember(action) {
  try {
    const data = yield call(api.addMemberToProject, action.member)
    yield put({
      type: CONSTANTS.ADD_PROJECT_MEMBER_SUCCESS,
      member: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.ADD_PROJECT_MEMBER_FAILURE, e })
  }
}

export function* deleteMember(action) {
  try {
    yield call(api.deleteMemberFromProject, action.memberId)
    yield put({
      type: CONSTANTS.DELETE_PROJECT_MEMBER_SUCCESS,
      memberId: action.memberId,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.DELETE_PROJECT_MEMBER_FAILURE, e })
  }
}

export function* updateProject(action) {
  try {
    const data = yield call(api.updateProject, action.projectId, action.project)
    yield delay(1000)
    yield put({
      type: CONSTANTS.UPDATE_PROJECT_SUCCESS,
      project: data.model,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({ type: CONSTANTS.UPDATE_PROJECT_FAILURE, e })
  }
}

export function* fetchProjectByIdWatcher() {
  yield takeEvery(CONSTANTS.FETCH_PROJECT_BY_ID_REQUEST, fetchProjectById)
  while (true) {
    const action = yield take(CONSTANTS.FETCH_PROJECT_BY_ID_SUCCESS)
    yield put({
      type: CONSTANTS.FETCH_PROJECT_STATS_BY_ID_REQUEST,
      projectId: action.project.id,
    })
    yield put({
      type: CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_REQUEST,
      projectId: action.project.id,
    })
  }
}

export function* fetchProjectStatsByIdWatcher() {
  yield takeEvery(
    CONSTANTS.FETCH_PROJECT_STATS_BY_ID_REQUEST,
    fetchProjectStatsById,
  )
}

export function* fetchProjectMembersByProjectIdWatcher() {
  yield takeEvery(
    CONSTANTS.FETCH_PROJECT_MEMBERS_BY_PROJECT_ID_REQUEST,
    fetchProjectMembersByProjectId,
  )
}

export function* fetchProjectMembersByFilterWatcher() {
  yield takeEvery(
    CONSTANTS.FETCH_PROJECT_MEMBERS_BY_FILTER_REQUEST,
    fetchProjectMembersByFilter,
  )
}

export function* setIsAddMemberModalVisible({ isVisible }) {
  try {
    yield put({
      type: CONSTANTS.SET_IS_ADD_MEMBER_MODAL_VISIBLE_SUCCESS,
      isVisible,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SET_IS_ADD_MEMBER_MODAL_VISIBLE_FAILURE,
    })
  }
}

export function* setIsAddMemberModalVisibleWatcher() {
  yield takeEvery(
    CONSTANTS.SET_IS_ADD_MEMBER_MODAL_VISIBLE_REQUEST,
    setIsAddMemberModalVisible,
  )
}

export function* setIsUpdateModalVisible({ isVisible }) {
  try {
    yield put({
      type: CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_SUCCESS,
      isVisible,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_FAILURE,
    })
  }
}

export function* setIsUpdateModalVisibleWatcher() {
  yield takeEvery(
    CONSTANTS.SET_IS_UPDATE_MODAL_VISIBLE_REQUEST,
    setIsUpdateModalVisible,
  )
}

export function* addMemberWatcher() {
  yield takeEvery(CONSTANTS.ADD_PROJECT_MEMBER_REQUEST, addMember)
}
export function* deleteMemberWatcher() {
  yield takeEvery(CONSTANTS.DELETE_PROJECT_MEMBER_REQUEST, deleteMember)
}
export function* updateProjectWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_PROJECT_REQUEST, updateProject)
}
export default function* selectedProjectSaga() {
  yield all([
    fetchProjectByIdWatcher(),
    fetchProjectStatsByIdWatcher(),
    addMemberWatcher(),
    deleteMemberWatcher(),
    updateProjectWatcher(),
    fetchProjectMembersByProjectIdWatcher(),
    fetchProjectMembersByFilterWatcher(),
    setIsUpdateModalVisibleWatcher(),
    setIsAddMemberModalVisibleWatcher(),
  ])
}
