import { put, takeEvery, all } from 'redux-saga/effects'
import * as CONSTANTS from './constants'

// Individual exports for testing
export function* setRoles(action) {
  try {
    yield put({
      type: CONSTANTS.SET_ROLES_SUCCESS,
      roles: action.roles,
    })
  } catch (e) {
    console.log('e: ', e)
    yield put({ type: CONSTANTS.SET_ROLES_FAILURE, e })
  }
}

export function* setRolesWatcher() {
  yield takeEvery(CONSTANTS.SET_ROLES_REQUEST, setRoles)
}
export default function* profileSaga() {
  yield all([setRolesWatcher()])
}
