/*
 *
 * Trees actions
 *
 */
import * as CONSTANTS from './constants'
export function fetchTrees() {
  return {
    type: CONSTANTS.FETCH_TREES_REQUEST,
  }
}
export function sendTree(tree) {
  return {
    type: CONSTANTS.SEND_TREES_REQUEST,
    tree,
  }
}
