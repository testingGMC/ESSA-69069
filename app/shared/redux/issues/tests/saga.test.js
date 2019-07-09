
import { put, takeEvery } from 'redux-saga/effects'
import * as sagas from '../saga'
import * as actions from '../actions'
import * as CONSTANTS from '../constants'

describe('fetchIssues Saga', () => {
  let fetchIssuesGenerator
  const issueId = '1'
  const action = actions.fetchIssues(issueId)
  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    fetchIssuesGenerator = sagas.fetchIssues(action)
    const callDescriptor = fetchIssuesGenerator.next().value
    expect(callDescriptor).toMatchSnapshot()
  })

  it('should dispatch the FETCH_ISSUES_SUCCESS action if it requests the data successfully', () => {
    const response = {
      model: [
        { id: '1', name: 'issue 1' },
        { id: '2', name: 'issue 2' },
        { id: '3', name: 'issue 3' },
      ],
    }
    const successAction = {
      type: CONSTANTS.FETCH_ISSUES_SUCCESS,
      issues: response.model,
    }
    const putDescriptor = fetchIssuesGenerator.next(response).value
    expect(putDescriptor).toEqual(put(successAction))
  })

  it('should call the FETCH_ISSUES_FAILURE action if the response errors', () => {
    const response = new Error('Some error')
    const putDescriptor = fetchIssuesGenerator.throw(response).value
    const failureAction = {
      type: CONSTANTS.FETCH_ISSUES_FAILURE,
    }
    expect(putDescriptor).toEqual(put(failureAction))
  })
})

describe('fetchIssuesWatcher Saga', () => {
  const fetchIssuesWatcher = sagas.fetchIssuesWatcher()

  it('should start task to watch for FETCH_ISSUES_REQUEST action', () => {
    const takeEveryDescriptor = fetchIssuesWatcher.next().value

    expect(takeEveryDescriptor).toEqual(
      takeEvery(CONSTANTS.FETCH_ISSUES_REQUEST, sagas.fetchIssues),
    )
  })
})
