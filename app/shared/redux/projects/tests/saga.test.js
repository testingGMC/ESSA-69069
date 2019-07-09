
import { put, takeEvery } from 'redux-saga/effects'
import * as sagas from '../saga'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchProjects Saga', () => {
  let fetchProjectsGenerator
  const projectId = '1'
  const action = actions.fetchProjects(projectId)

  beforeEach(() => {
    fetchProjectsGenerator = sagas.fetchProjects(action)
    const callDescriptor = fetchProjectsGenerator.next().value
    expect(callDescriptor).toMatchSnapshot()
  })

  it('should dispatch the FETCH_PROJECTS_SUCCESS action if it requests the data successfully', () => {
    const response = {
      model: [
        { id: '1', name: 'project 1' },
        { id: '2', name: 'project 2' },
        { id: '3', name: 'project 3' },
      ],
    }
    const successAction = {
      type: CONSTANTS.FETCH_PROJECTS_SUCCESS,
      projects: response.model,
    }
    const putDescriptor = fetchProjectsGenerator.next(response).value
    expect(putDescriptor).toEqual(put(successAction))
  })

  it('should call the FETCH_PROJECTS_FAILURE action if the response errors', () => {
    const response = new Error('Some error')
    const putDescriptor = fetchProjectsGenerator.throw(response).value
    const failureAction = {
      type: CONSTANTS.FETCH_PROJECTS_FAILURE,
    }
    expect(putDescriptor).toEqual(put(failureAction))
  })
})


describe('fetchProjectsWatcher Saga', () => {
  const fetchProjectsWatcher = sagas.fetchProjectsWatcher()

  it('should start task to watch for FETCH_PROJECTS_REQUEST action', () => {
    const takeEveryDescriptor = fetchProjectsWatcher.next().value

    expect(takeEveryDescriptor).toEqual(
      takeEvery(CONSTANTS.FETCH_PROJECTS_REQUEST, sagas.fetchProjects),
    )
  })
})
