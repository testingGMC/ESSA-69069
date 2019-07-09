/*
 *
 * Skills actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchSkills() {
  return {
    type: CONSTANTS.FETCH_SKILLS_REQUEST,
  }
}
