import { takeEvery, put, all, call } from 'redux-saga/effects'
import * as api from 'shared/services/liveshare.service'
import * as CONSTANTS from './constants'

// Individual exports for testing
export function* createHubConnection(action) {
  try {
    const data = yield call(
      api.createHubConnection,
      action.onMessageReceivedCallback,
      action.heartBeatCallback,
    )
    yield put({
      type: CONSTANTS.HUB_CONNECTION_SUCCESS,
      connection: data,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.HUB_CONNECTION_FAILURE })
  }
}
export function* createOrLoadSkillInstance(action) {
  try {
    const data = yield call(api.createOrLoadSkillInstance, action.skillId)
    yield put({
      type: CONSTANTS.LOAD_SKILL_INSTANCE_SUCCESS,
      instance: data.model,
    })
    yield put({
      type: CONSTANTS.SET_CHANGE_TRACKING_REQUEST,
      trackChanges: true,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.LOAD_SKILL_INSTANCE_FAILURE })
  }
}
export function* closeOrUnloadSkillInstance(action) {
  try {
    const data = yield call(api.closeOrUnloadSkillInstance, action.skillId)
    yield put({
      type: CONSTANTS.UNLOAD_SKILL_INSTANCE_SUCCESS,
      instance: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.UNLOAD_SKILL_INSTANCE_FAILURE })
  }
}
export function* sendPatch(action) {
  try {
    const data = yield call(
      api.sendLiveShareMessage,
      action.connection,
      action.message,
    )
    yield put({
      type: CONSTANTS.SEND_PATCH_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.SEND_PATCH_FAILURE })
  }
}
export function* sendChatMessage(action) {
  try {
    const data = yield call(
      api.sendLiveShareMessage,
      action.connection,
      action.message,
    )
    yield put({
      type: CONSTANTS.SEND_CHAT_MESSAGE_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.SEND_CHAT_MESSAGE_FAILURE })
  }
}
export function* sendContentOperation(action) {
  try {
    const data = yield call(
      api.publishPageOperations,
      action.skillId,
      action.pageId,
      action.operations,
    )
    yield put({
      type: CONSTANTS.SEND_CONTENT_OPERATION_SUCCESS,
    })
    action.medium.mutex.acquire().then(function(release) {
      action.medium.queue.splice(0, action.medium.maxOperationsCount)
      release()
    })
  } catch (e) {
    yield put({ type: CONSTANTS.SEND_CONTENT_OPERATION_FAILURE })
  }
}

export function* createHubConnectionWatcher() {
  yield takeEvery(CONSTANTS.HUB_CONNECTION_REQUEST, createHubConnection)
}

export function* createOrLoadSkillInstanceWatcher() {
  yield takeEvery(
    CONSTANTS.LOAD_SKILL_INSTANCE_REQUEST,
    createOrLoadSkillInstance,
  )
}
export function* closeOrUnloadSkillInstanceWatcher() {
  yield takeEvery(
    CONSTANTS.UNLOAD_SKILL_INSTANCE_REQUEST,
    closeOrUnloadSkillInstance,
  )
}
export function* sendPatchWatcher() {
  yield takeEvery(CONSTANTS.SEND_PATCH_REQUEST, sendPatch)
}
export function* sendChatMessageWatcher() {
  yield takeEvery(CONSTANTS.SEND_CHAT_MESSAGE_REQUEST, sendChatMessage)
}
export function* sendContentOperationWatcher() {
  yield takeEvery(
    CONSTANTS.SEND_CONTENT_OPERATION_REQUEST,
    sendContentOperation,
  )
}

export function* collaboratorJoined(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.COLLABORATOR_JOINED_EVENT_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.COLLABORATOR_JOINED_EVENT_FAILURE })
  }
}
export function* collaboratorLeft(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.COLLABORATOR_LEFT_EVENT_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.COLLABORATOR_LEFT_EVENT_FAILURE })
  }
}
export function* patchReceived(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.PATCH_RECEIVED_EVENT_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.PATCH_RECEIVED_EVENT_FAILURE })
  }
}
export function* setChangeTracking(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.SET_CHANGE_TRACKING_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.SET_CHANGE_TRACKING_FAILURE })
  }
}
export function* setSkillData(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.SET_SKILL_DATA_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.SET_SKILL_DATA_FAILURE })
  }
}
export function* chatMessageReceived(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.CHAT_MESSAGE_RECEIVED_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.CHAT_MESSAGE_RECEIVED_FAILURE })
  }
}
export function* addContentOperations(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.ADD_CONTENT_OPERATIONS_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.ADD_CONTENT_OPERATIONS_FAILURE })
  }
}
export function* setPageContent(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.SET_PAGE_CONTENT_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.SET_PAGE_CONTENT_FAILURE })
  }
}
export function* liveshareNodeOperationReceived(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.LIVESHARE_NODE_OPERATION_RECEIVED_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.LIVESHARE_NODE_OPERATION_RECEIVED_FAILURE })
  }
}
export function* selectElementById(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.ADD_USER_SELECTION_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.ADD_USER_SELECTION_FAILURE })
  }
}
export function* liveshareLinkOperationReceived(action) {
  try {
    yield put({
      ...action,
      type: CONSTANTS.LIVESHARE_LINK_OPERATION_RECEIVED_SUCCESS,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.LIVESHARE_LINK_OPERATION_RECEIVED_FAILURE })
  }
}
export function* heartBeat(action) {
  try {
    const data = yield call(api.heartBeat, action.connection)
    yield put({
      type: CONSTANTS.HEARTBEAT_SUCCESS,
    })
  } catch (e) {
    console.log(e)
    yield put({ type: CONSTANTS.HEARTBEAT_FAILURE })
  }
}

export function* collaboratorJoinedWatcher() {
  yield takeEvery(
    CONSTANTS.COLLABORATOR_JOINED_EVENT_REQUEST,
    collaboratorJoined,
  )
}
export function* collaboratorLeftWatcher() {
  yield takeEvery(CONSTANTS.COLLABORATOR_LEFT_EVENT_REQUEST, collaboratorLeft)
}
export function* patchReceivedWatcher() {
  yield takeEvery(CONSTANTS.PATCH_RECEIVED_EVENT_REQUEST, patchReceived)
}
export function* setChangeTrackingWatcher() {
  yield takeEvery(CONSTANTS.SET_CHANGE_TRACKING_REQUEST, setChangeTracking)
}
export function* setSkillDataWatcher() {
  yield takeEvery(CONSTANTS.SET_SKILL_DATA_REQUEST, setSkillData)
}
export function* chatMessageReceivedWatcher() {
  yield takeEvery(CONSTANTS.CHAT_MESSAGE_RECEIVED_REQUEST, chatMessageReceived)
}
export function* addContentOperationsWatcher() {
  yield takeEvery(
    CONSTANTS.ADD_CONTENT_OPERATIONS_REQUEST,
    addContentOperations,
  )
}
export function* selectElementByIdWatcher() {
  yield takeEvery(CONSTANTS.ADD_USER_SELECTION_REQUEST, selectElementById)
}
export function* setPageContentWatcher() {
  yield takeEvery(CONSTANTS.SET_PAGE_CONTENT_REQUEST, setPageContent)
}
export function* liveshareNodeOperationReceivedWatcher() {
  yield takeEvery(
    CONSTANTS.LIVESHARE_NODE_OPERATION_RECEIVED_REQUEST,
    liveshareNodeOperationReceived,
  )
}
export function* liveshareLinkOperationReceivedWatcher() {
  yield takeEvery(
    CONSTANTS.LIVESHARE_LINK_OPERATION_RECEIVED_REQUEST,
    liveshareLinkOperationReceived,
  )
}
export function* heartBeatWatcher() {
  yield takeEvery(CONSTANTS.HEARTBEAT_REQUEST, heartBeat)
}
export default function* liveshareSaga() {
  yield all([
    createHubConnectionWatcher(),
    createOrLoadSkillInstanceWatcher(),
    closeOrUnloadSkillInstanceWatcher(),
    sendPatchWatcher(),
    sendChatMessageWatcher(),
    sendContentOperationWatcher(),
    collaboratorJoinedWatcher(),
    collaboratorLeftWatcher(),
    patchReceivedWatcher(),
    setChangeTrackingWatcher(),
    setSkillDataWatcher(),
    chatMessageReceivedWatcher(),
    addContentOperationsWatcher(),
    setPageContentWatcher(),
    liveshareNodeOperationReceivedWatcher(),
    liveshareLinkOperationReceivedWatcher(),
    selectElementByIdWatcher(),
    heartBeatWatcher(),
  ])
}
