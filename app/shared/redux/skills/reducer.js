/*
 *
 * Skills reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const skillsReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.FETCH_SKILLS_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_SKILLS_SUCCESS:
        draft.data = action.skills
        draft.loading = false
        break
      case CONSTANTS.FETCH_SKILLS_FAILURE:
        draft.loading = false
        break
    }
  })

export default skillsReducer
