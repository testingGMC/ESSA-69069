import { put, takeEvery } from 'redux-saga/effects'
import * as sagas from '../saga'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchProjectById Saga', () => {
  let fetchProjectByIdGenerator
  const projectId = '1'
  const action = actions.fetchProjectById(projectId)
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    fetchProjectByIdGenerator = sagas.fetchProjectById(action)
    const callDescriptor = fetchProjectByIdGenerator.next().value
    expect(callDescriptor).toMatchSnapshot()
  })

  it('should dispatch the FETCH_PROJECT_BY_ID_SUCCESS action if it requests the data successfully', () => {
    const response = {
      model: [
        { id: '1', name: 'project 1' },
        { id: '2', name: 'project 2' },
        { id: '3', name: 'project 3' },
      ],
    }
    const successAction = {
      type: CONSTANTS.FETCH_PROJECT_BY_ID_SUCCESS,
      project: response.model,
    }
    const putDescriptor = fetchProjectByIdGenerator.next(response).value
    expect(putDescriptor).toEqual(put(successAction))
  })

  it('should call the FETCH_PROJECT_BY_ID_FAILURE action if the response errors', () => {
    const response = new Error('Some error')
    const putDescriptor = fetchProjectByIdGenerator.throw(response).value
    const failureAction = {
      type: CONSTANTS.FETCH_PROJECT_BY_ID_FAILURE,
    }
    expect(putDescriptor).toEqual(put(failureAction))
  })
})

describe('fetchProjectByIdWatcher Saga', () => {
  const fetchProjectByIdWatcher = sagas.fetchProjectByIdWatcher()

  it('should start task to watch for FETCH_PROJECT_BY_ID_REQUEST action', () => {
    const takeEveryDescriptor = fetchProjectByIdWatcher.next().value

    expect(takeEveryDescriptor).toEqual(
      takeEvery(CONSTANTS.FETCH_PROJECT_BY_ID_REQUEST, sagas.fetchProjectById),
    )
  })
})
