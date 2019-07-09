/*
 *
 * Graphnos actions
 *
 */
import * as CONSTANTS from './constants'

export function fetchGraph() {
  return {
    type: CONSTANTS.FETCH_GRAPH_REQUEST,
  }
}

export const createNode = node => ({
  type: CONSTANTS.CREATE_NODE_REQUEST,
  node,
})

export const updateNode = (id, node) => ({
  type: CONSTANTS.UPDATE_NODE_REQUEST,
  id,
  node,
})

export const deleteNode = (nodeId, nodeType) => ({
  type: CONSTANTS.DELETE_NODE_REQUEST,
  nodeId,
  nodeType,
})

export const createOrUpdateDependency = (source, target, weight) => ({
  type: CONSTANTS.CREATE_DEPENDENCY_REQUEST,
  source,
  target,
  weight,
})

export const updateDependency = dependency => ({
  type: CONSTANTS.UPDATE_DEPENDENCY_REQUEST,
  dependency,
})

export const deleteDependency = (source, target) => ({
  type: CONSTANTS.DELETE_DEPENDENCY_REQUEST,
  source,
  target,
})

export const loadSimulatedGraph = graph => ({
  type: CONSTANTS.LOAD_SIMULATED_GRAPH,
  graph,
})

export const updateSimulationNode = nodeId => ({
  type: CONSTANTS.UPDATE_SIMULATION_NODE,
  nodeId,
})

export const duplicateNode = (node, source, weight) => ({
  type: CONSTANTS.DUPLICATE_SKILL_REQUEST,
  node,
  source,
  weight,
})

export const resetSimulation = () => ({
  type: CONSTANTS.RESET_SIMULATION,
})

export const finishSimulation = () => ({
  type: CONSTANTS.FINISH_SIMULATION,
})

export const applyPBro = (
  parentNodeId,
  firstChildNodeId,
  secondChildNodeId,
) => ({
  type: CONSTANTS.APPLY_PBRO_REQUEST,
  parentNodeId,
  firstChildNodeId,
  secondChildNodeId,
})

export const applyReversePBro = (sourceId, targetId) => ({
  type: CONSTANTS.APPLY_REVERSE_PBRO_REQUEST,
  sourceId,
  targetId,
})

export const magnify = nodeId => ({
  type: CONSTANTS.MAGNIFY_REQUEST,
  nodeId,
})

export const redirectToEditor = nodeId => ({
  type: CONSTANTS.REDIRECT_TO_EDITOR,
  nodeId,
})

export const updateTrackFilters = trackIds => ({
  type: CONSTANTS.UPDATE_TRACK_FILTER_REQUEST,
  trackIds,
})

export const updateNodeFilters = nodeIds => ({
  type: CONSTANTS.UPDATE_NODE_FILTER_REQUEST,
  nodeIds,
})

export const selectNode = node => ({
  type: CONSTANTS.SELECT_NODE_REQUEST,
  node,
})

export const setPreviousNode = node => ({
  type: CONSTANTS.SET_PREVIOUS_NODE_REQUEST,
  node,
})

export const setLink = link => ({
  type: CONSTANTS.SET_LINK_REQUEST,
  link,
})

export const setShowModal = isVisible => ({
  type: CONSTANTS.SET_SHOW_MODAL_REQUEST,
  isVisible,
})

export const clearReducer = () => ({
  type: CONSTANTS.CLEAR_REDUCER_REQUEST,
})
