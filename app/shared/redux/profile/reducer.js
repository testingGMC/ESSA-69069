/*
 *
 * Profile reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {
  loading: false,
  data: { roles: [] },
}

/* eslint-disable default-case, no-param-reassign */
const profileReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.SET_ROLES_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.SET_ROLES_SUCCESS:
        draft.loading = false
        draft.data.roles = action.roles
        break
      case CONSTANTS.SET_ROLES_FAILURE:
        draft.loading = false
        break
    }
  })

export default profileReducer
