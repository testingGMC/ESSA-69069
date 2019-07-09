import { takeEvery, put, all, call } from 'redux-saga/effects'
import * as api from 'shared/services/issue.service'
import * as CONSTANTS from './constants'

// Individual exports for testing
export function* fetchIssues() {
  try {
    const data = yield call(api.fetchIssues)
    yield put({
      type: CONSTANTS.FETCH_ISSUES_SUCCESS,
      issues: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_ISSUES_FAILURE, e })
  }
}

export function* updateStatus(action) {
  try {
    const data = yield call(api.updateIssue, action.issueId, action.issue)
    yield put({
      type: CONSTANTS.UPDATE_STATUS_SUCCESS,
      issueId: action.issueId,
      issue: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.UPDATE_STATUS_FAILURE, e })
  }
}

export function* fetchIssuesWatcher() {
  yield takeEvery(CONSTANTS.FETCH_ISSUES_REQUEST, fetchIssues)
}

export function* updateStatusWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_STATUS_REQUEST, updateStatus)
}

export default function* issuesSaga() {
  yield all([fetchIssuesWatcher(), updateStatusWatcher()])
}
