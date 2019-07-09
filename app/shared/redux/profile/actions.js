/*
 *
 * Profile actions
 *
 */
import * as CONSTANTS from './constants'

export function setRoles(roles) {
  return {
    type: CONSTANTS.SET_ROLES_REQUEST,
    roles,
  }
}
