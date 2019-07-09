import { put, takeEvery, all, call } from 'redux-saga/effects'
import * as api from 'shared/services/version-control.service'
import { push } from 'connected-react-router'
import * as CONSTANTS from './constants'

export function* fetchCommits() {
  try {
    const data = yield call(api.getCommits)

    yield put({
      type: CONSTANTS.FETCH_COMMITS_SUCCESS,
      commits: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_COMMITS_FAILURE, e })
  }
}
export function* fetchLatestCommits() {
  try {
    const data = yield call(api.getLatestCommits)
    yield put({
      type: CONSTANTS.FETCH_LATEST_COMMITS_SUCCESS,
      commits: data.model,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_LATEST_COMMITS_FAILURE, e })
  }
}
export function* revertToACommit(action) {
  try {
    const data = yield call(
      api.revertToACommit,
      action.id,
      action.message,
      action.description,
    )
    yield put({
      type: CONSTANTS.REVERT_COMMIT_SUCCESS,
      commit: data.model,
    })
    yield put(push('/'))
  } catch (e) {
    yield put({ type: CONSTANTS.REVERT_COMMIT_FAILURE, e })
  }
}

export function* fetchCommitsWatcher() {
  yield takeEvery(CONSTANTS.FETCH_COMMITS_REQUEST, fetchCommits)
}

export function* fetchLatestCommitsWatcher() {
  yield takeEvery(CONSTANTS.FETCH_LATEST_COMMITS_REQUEST, fetchLatestCommits)
}

export function* revertCommitsWatcher() {
  yield takeEvery(CONSTANTS.REVERT_COMMIT_REQUEST, revertToACommit)
}

export default function* commitsSaga() {
  yield all([
    fetchCommitsWatcher(),
    fetchLatestCommitsWatcher(),
    revertCommitsWatcher(),
  ])
}
