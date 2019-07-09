import { put, takeEvery, all, takeLatest, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import * as api from 'shared/services/select-tree.service'
import * as CONSTANTS from './constants'
import { trees } from './data'

const delay = ms => new Promise(res => setTimeout(res, ms))
export function* fetchTrees() {
  try {
    const data = trees
    yield delay(1000)
    yield put({
      type: CONSTANTS.FETCH_TREES_SUCCESS,
      trees: data,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_TREES_FAILURE, e })
  }
}
export function* sendTree(action) {
  try {
    yield call(api.createGraphFromTree, action.tree)
    yield put({
      type: CONSTANTS.SEND_TREES_SUCCESS,
      trees: action.tree,
    })
    yield put(push('/graphnos/skill-network'))
  } catch (e) {
    yield put({ type: CONSTANTS.SEND_TREES_FAILURE, e })
  }
}

export function* fetchTreesWatcher() {
  yield takeEvery(CONSTANTS.FETCH_TREES_REQUEST, fetchTrees)
}

export function* addTreeWatcher() {
  yield takeLatest(CONSTANTS.SEND_TREES_REQUEST, sendTree)
}

export default function* selectedTreesSaga() {
  yield all([fetchTreesWatcher(), addTreeWatcher()])
}
