import { put, takeEvery } from 'redux-saga/effects'
import * as sagas from '../saga'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'


describe('fetchCommits Saga', () => {
  let fetchCommitsGenerator
  const commits = '1'
  const action = actions.fetchCommits(commits)
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    fetchCommitsGenerator = sagas.fetchCommits(action)
    const callDescriptor = fetchCommitsGenerator.next().value
    expect(callDescriptor).toMatchSnapshot()
  })

  it('should dispatch the FETCH_COMMITS_SUCCESS action if it requests the data successfully', () => {
    const response = {
      model: [
        { id: '1', name: 'commit 1' },
        { id: '2', name: 'commit 2' },
        { id: '3', name: 'commit 3' },
      ],
    }
    const successAction = {
      type: CONSTANTS.FETCH_COMMITS_SUCCESS,
      commits: response.model,
    }
    const putDescriptor = fetchCommitsGenerator.next(response).value
    expect(putDescriptor).toEqual(put(successAction))
  })

  it('should call the FETCH_COMMITS_FAILURE action if the response errors', () => {
    const response = new Error('Some error')
    const putDescriptor = fetchCommitsGenerator.throw(response).value
    const failureAction = {
      type: CONSTANTS.FETCH_COMMITS_FAILURE,
    }
    expect(putDescriptor).toEqual(put(failureAction))
  })
})


describe('fetchCommitsWatcher Saga', () => {
  const fetchCommitsWatcher = sagas.fetchCommitsWatcher()

  it('should start task to watch for FETCH_COMMITS_REQUEST action', () => {
    const takeEveryDescriptor = fetchCommitsWatcher.next().value

    expect(takeEveryDescriptor).toEqual(
      takeEvery(CONSTANTS.FETCH_COMMITS_REQUEST, sagas.fetchCommits),
    )
  })
})
