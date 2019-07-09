/*
 *
 * Commits actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchCommits() {
  return {
    type: CONSTANTS.FETCH_COMMITS_REQUEST,
  }
}

export function fetchLatestCommits() {
  return {
    type: CONSTANTS.FETCH_LATEST_COMMITS_REQUEST,
  }
}

export function revertToACommit(id, message, description) {
  return {
    type: CONSTANTS.REVERT_COMMIT_REQUEST,
    id,
    message,
    description,
  }
}
