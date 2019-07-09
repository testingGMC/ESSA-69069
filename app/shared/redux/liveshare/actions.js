/*
 *
 * LiveShare actions
 *
 */
import * as CONSTANTS from './constants'
import {createSkillUpdateMessage, createChatMessage, createContentOperationsMessage } from '../../utils/liveshare-message-builder'

export function createHubConnection(onMessageReceivedCallback, heartBeatCallback) {
  return {
    type: CONSTANTS.HUB_CONNECTION_REQUEST,
    onMessageReceivedCallback,
    heartBeatCallback
  }
}

export function heartBeat(connection) {
  return {
    type: CONSTANTS.HEARTBEAT_REQUEST,
    connection
  }
}

export function createOrLoadSkillInstance(skillId) {
  return {
    type: CONSTANTS.LOAD_SKILL_INSTANCE_REQUEST,
    skillId
  }
}

export function closeOrUnloadSkillInstance(skillId) {
  return {
    type: CONSTANTS.UNLOAD_SKILL_INSTANCE_REQUEST,
    skillId
  }
}

export function collaboratorJoined(collaborator) {
  return {
    type: CONSTANTS.COLLABORATOR_JOINED_EVENT_REQUEST,
    collaborator
  }
}
export function collaboratorLeft(collaborator) {
  return {
    type: CONSTANTS.COLLABORATOR_LEFT_EVENT_REQUEST,
    collaborator
  }
}

export function sendPatch(connection, skillId, patch, origin) {
  return {
    type: CONSTANTS.SEND_PATCH_REQUEST,
    connection,
    message: createSkillUpdateMessage(skillId, patch, origin)
  }
}
export function applyPatch(origin, patch) {
  return {
    type: CONSTANTS.PATCH_RECEIVED_EVENT_REQUEST,
    origin,
    patch
  }
}
export function setChangeTracking(trackChanges) {
  return {
    type: CONSTANTS.SET_CHANGE_TRACKING_REQUEST,
    trackChanges
  }
}

export function setSkillData(data) {
  return {
    type: CONSTANTS.SET_SKILL_DATA_REQUEST,
    data
  }
}


export function sendChatMessage(connection, skillId, message, id) {
  return {
    type: CONSTANTS.SEND_CHAT_MESSAGE_REQUEST,
    connection,
    message: createChatMessage(skillId, message, id)
  }
}

export function receiveChatMessage(message) {
  return {
    type: CONSTANTS.CHAT_MESSAGE_RECEIVED_REQUEST,
    message
  }
}

export function sendContentOperationMessage(skillId, pageId, operations, medium) {
  return {
    type: CONSTANTS.SEND_CONTENT_OPERATION_REQUEST,
    skillId,
    pageId,
    operations,
    medium
  }
}

export function addContentOperations(pageId, operations) {
  return {
    type: CONSTANTS.ADD_CONTENT_OPERATIONS_REQUEST,
    operations,
    pageId
  }
}

export function setPageContent(pageId, content) {
  return {
    type: CONSTANTS.SET_PAGE_CONTENT_REQUEST,
    content,
    pageId
  }
}

export function nodeOperationReceived(id, name, type, operationType) {
  return {
    type: CONSTANTS.LIVESHARE_NODE_OPERATION_RECEIVED_REQUEST,
    id,
    name,
    nodeType: type,
    operationType
  }
}

export function linkOperationReceived(sourceId, targetId, weight, operationType) {
  return {
    type: CONSTANTS.LIVESHARE_LINK_OPERATION_RECEIVED_REQUEST,
    sourceId,
    targetId,
    weight,
    operationType
  }
}


export function selectElementById(collaborator, id) {
  return {
    type: CONSTANTS.ADD_USER_SELECTION_REQUEST,
    id,
    collaborator,
  }
}

