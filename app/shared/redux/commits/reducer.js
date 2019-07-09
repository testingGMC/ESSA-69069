/*
 *
 * Commits reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const commitsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.FETCH_COMMITS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_COMMITS_SUCCESS:
        draft.commits = action.commits
        draft.loading = false
        break
      case CONSTANTS.FETCH_COMMITS_FAILURE:
        draft.loading = false
        break

      case CONSTANTS.FETCH_LATEST_COMMITS_REQUEST:
        draft.latestLoading = true
        break
      case CONSTANTS.FETCH_LATEST_COMMITS_SUCCESS:
        draft.latestCommits = action.commits
        draft.latestLoading = false
        break
      case CONSTANTS.FETCH_LATEST_COMMITS_FAILURE:
        draft.latestLoading = false
        break   
    }
  })

export default commitsReducer
