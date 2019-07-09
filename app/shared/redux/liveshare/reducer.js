/*
 *
 * LiveShare reducer
 *
 */
import produce from 'immer'
import { isEmpty } from 'lodash'
import * as CONSTANTS from './constants'

export const initialState = { connected: false, connectionStatus: 0 }

/* eslint-disable default-case, no-param-reassign */
const liveShareReducer = (state = initialState, action) =>
  produce(state, draft => {
    let collaborators = null
    switch (action.type) {
      case CONSTANTS.HUB_CONNECTION_SUCCESS:
        draft.connection = action.connection
        break  
      case CONSTANTS.HEARTBEAT_SUCCESS:
        draft.connectionStatus = 1
        break        
      case CONSTANTS.HUB_CONNECTION_REQUEST:
        draft.connectionStatus = 2
        break
      case CONSTANTS.LOAD_SKILL_INSTANCE_FAILURE:
      case CONSTANTS.SEND_MESSAGE_FAILURE:
      case CONSTANTS.HUB_CONNECTION_FAILURE:
      case CONSTANTS.SEND_CONTENT_OPERATION_FAILURE:  
      case CONSTANTS.HEARTBEAT_FAILURE:  
        draft.connected = false
        draft.connectionStatus = 0
        break
      case CONSTANTS.LOAD_SKILL_INSTANCE_SUCCESS:
        draft.instance = action.instance
        draft.connected = true
        draft.connectionStatus = 1
        break
      case CONSTANTS.UNLOAD_SKILL_INSTANCE_SUCCESS:
        draft.instance = null
        break
      case CONSTANTS.COLLABORATOR_JOINED_EVENT_SUCCESS:
        collaborators = draft.instance.collaborators.filter(
          e => e.id !== action.collaborator.id,
        )

        draft.instance.collaborators = [...collaborators, action.collaborator]
        break
      case CONSTANTS.CHAT_MESSAGE_RECEIVED_SUCCESS:
        if (
          isEmpty(
            draft.instance.messages.filter(e => e.id === action.message.id),
          )
        )
          draft.instance.messages = [...draft.instance.messages, action.message]
        break
      case CONSTANTS.COLLABORATOR_LEFT_EVENT_SUCCESS:
        collaborators = draft.instance.collaborators.filter(
          e => e.id !== action.collaborator.id,
        )

        draft.instance.collaborators = collaborators
        break
    }
  })

export default liveShareReducer
