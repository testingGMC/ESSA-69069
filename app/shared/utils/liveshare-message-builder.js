import * as Commands from "./liveshare-commands"

export const encodeMessage = (message) =>  JSON.stringify(message)

// Liveness check operations
export const createPingMessage = () => encodeMessage({command: Commands.Ping})

// Page based change operations
export const createUpdateCursorPositionMessage = (skillId, pageId, offset) => encodeMessage({command: Commands.UpdateCursorPosition, skillId, pageId, offset})
export const createSelectTextMessage = (skillId, pageId, startOffset, endOffset) => encodeMessage({command: Commands.SelectText, skillId, pageId, startOffset, endOffset})
export const createContentOperationsMessage = (skillId, pageId, operations) => encodeMessage({command: Commands.ContentOperations, skillId, pageId, operations})

// Skill based change operations
export const createUpdateSelectedElementMessage = ( skillId, elementId) => encodeMessage({command: Commands.UpdateSelectedElement, skillId, elementId})
export const createSkillUpdateMessage = ( skillId, patch, origin) => encodeMessage({command: Commands.SkillUpdate,  skillId, patch, origin})
export const createChatMessage = (skillId, message, id) => encodeMessage({command: Commands.Chat,  skillId, message, id})

// Control Operations
export const createCreateOrLoadSkillInstanceMessage = (skillId) => encodeMessage({command: Commands.CreateOrLoadSkillInstance, skillId})
export const createCloseOrUnloadSkillInstanceMessage = (skillId) => encodeMessage({command: Commands.CloseOrUnloadSkillInstance, skillId})
export const createSyncMessage = (skillId, data) => encodeMessage({command: Commands.Sync,  skillId, data})
