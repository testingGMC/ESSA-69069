import { takeEvery, put, all } from 'redux-saga/effects'
import * as CONSTANTS from './constants'
import { skills } from './data'
const delay = ms => new Promise(res => setTimeout(res, ms))
// Individual exports for testing
export function* fetchSkills(/* action */) {
  try {
    // we have to implement this api
    // const data = yield call(api.fetchSkills)
    const data = skills
    yield delay(1000)
    yield put({
      type: CONSTANTS.FETCH_SKILLS_SUCCESS,
      skills: data,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_SKILLS_FAILURE })
  }
}
export function* fetchSkillsWatcher() {
  yield takeEvery(CONSTANTS.FETCH_SKILLS_REQUEST, fetchSkills)
}

export default function* issuesSaga() {
  yield all([fetchSkillsWatcher()])
}
