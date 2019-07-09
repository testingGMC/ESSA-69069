/*
 *
 * selectTree reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'

export const initialState = {}

/* eslint-disable default-case, no-param-reassign */
const selectTreeReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.FETCH_TREES_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_TREES_SUCCESS:
        draft.data = action.trees
        draft.loading = false
        break
      case CONSTANTS.FETCH_TREES_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.SEND_TREES_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.SEND_TREES_SUCCESS:
        if (!draft.data) {
          draft.data = []
        }
        draft.data.push(action.trees)

        draft.loading = false
        break
      case CONSTANTS.SEND_TREES_FAILURE:
        draft.loading = false
        break
    }
  })

export default selectTreeReducer
