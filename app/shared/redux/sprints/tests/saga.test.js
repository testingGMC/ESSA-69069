/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeEvery } from 'redux-saga/effects'
import * as sagas from '../saga'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchSprints Saga', () => {
  let fetchSprintsGenerator
  const projectId = '1'
  const action = actions.fetchSprints(projectId)
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    fetchSprintsGenerator = sagas.fetchSprints(action)
    const callDescriptor = fetchSprintsGenerator.next().value
    expect(callDescriptor).toMatchSnapshot()
  })

  it('should dispatch the FETCH_SPRINTS_SUCCESS action if it requests the data successfully', () => {
    const response = {
      model: [
        { id: '1', name: 'Sprint 1' },
        { id: '2', name: 'Sprint 2' },
        { id: '3', name: 'Sprint 3' },
      ],
    }
    const successAction = {
      type: CONSTANTS.FETCH_SPRINTS_SUCCESS,
      sprints: response.model,
    }
    const putDescriptor = fetchSprintsGenerator.next(response).value
    expect(putDescriptor).toEqual(put(successAction))
  })

  it('should call the FETCH_SPRINTS_FAILURE action if the response errors', () => {
    const response = new Error('Some error')
    const putDescriptor = fetchSprintsGenerator.throw(response).value
    const failureAction = {
      type: CONSTANTS.FETCH_SPRINTS_FAILURE,
    }
    expect(putDescriptor).toEqual(put(failureAction))
  })
})

describe('fetchSprintsWatcher Saga', () => {
  const fetchSprintsWatcher = sagas.fetchSprintsWatcher()

  it('should start task to watch for FETCH_SPRINTS_REQUEST action', () => {
    const takeEveryDescriptor = fetchSprintsWatcher.next().value

    expect(takeEveryDescriptor).toEqual(
      takeEvery(CONSTANTS.FETCH_SPRINTS_REQUEST, sagas.fetchSprints),
    )
  })
})
