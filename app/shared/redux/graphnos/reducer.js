/*
 *
 * Graphnos reducer
 *
 */
import produce from 'immer'
import * as CONSTANTS from './constants'
import * as LIVESHARE_CONSTANTS from '../liveshare/constants'
import * as LIVESHARE_COMMANDS from '../../utils/liveshare-commands'

if (!localStorage.trackFilters) {
  localStorage.setItem('trackFilters', JSON.stringify([]))
}
if (!localStorage.nodeFilters) {
  localStorage.setItem('nodeFilters', JSON.stringify([]))
}

export const initialState = {
  loading: false,
  data: {
    graph: {
      nodes: [],
      dependencies: [],
    },
    simulatedGraph: {},
    isSimulating: false,
    trackFilters: JSON.parse(localStorage.trackFilters),
    nodeFilters: JSON.parse(localStorage.nodeFilters),
    selectedNode: {},
    previousNode: {},
    link: { weight: 0 },
    showModal: false,
  },
}

/* eslint-disable default-case, no-param-reassign */
const graphnosReducer = (state = initialState, action) =>
  produce(state, draft => {
    const newTrackFilters = []
    const newNodeFilters = []
    let filteredDependencies = []
    let filteredNodes = []
    switch (action.type) {
      case CONSTANTS.FETCH_GRAPH_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.FETCH_GRAPH_SUCCESS:
        draft.data.graph = action.graph
        draft.data.trackFilters = draft.data.trackFilters.filter(track =>
          action.graph.nodes.find(node => node.id === track.id),
        )
        if (
          draft.data.trackFilters.length !==
          initialState.data.trackFilters.length
        ) {
          localStorage.setItem(
            'trackFilters',
            JSON.stringify(draft.data.trackFilters),
          )
        }
        draft.data.nodeFilters = draft.data.nodeFilters.filter(nodeFilter =>
          action.graph.nodes.find(node => node.id === nodeFilter.id),
        )
        if (
          draft.data.nodeFilters.length !== initialState.data.nodeFilters.length
        ) {
          localStorage.setItem(
            'nodeFilters',
            JSON.stringify(draft.data.nodeFilters),
          )
        }
        draft.loading = false
        break
      case CONSTANTS.FETCH_GRAPH_FAILURE:
        draft.loading = false
        break
      case CONSTANTS.SELECT_NODE_SUCCESS:
        draft.data.selectedNode = action.node
        break
      case CONSTANTS.SET_PREVIOUS_NODE_SUCCESS:
        draft.data.previousNode = action.node
        break
      case CONSTANTS.SET_LINK_SUCCESS:
        draft.data.link = action.link
        break
      case CONSTANTS.SET_SHOW_MODAL_SUCCESS:
        draft.data.showModal = action.isVisible
        break
      // node creation
      case CONSTANTS.CREATE_NODE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.CREATE_NODE_SUCCESS:
        draft.data.graph.nodes.push(action.node)
        draft.data.showModal = false
        draft.loading = false
        break
      case CONSTANTS.CREATE_NODE_FAILURE:
        draft.loading = false
        break

      // node update
      case CONSTANTS.UPDATE_NODE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_NODE_SUCCESS:
        draft.data.graph.nodes = draft.data.graph.nodes.map(node =>
          node.id === action.node.id ? action.node : node,
        )
        draft.data.selectedNode = action.node
        draft.data.showModal = false
        draft.loading = false
        break
      case CONSTANTS.UPDATE_NODE_FAILURE:
        draft.loading = false
        break

      // node delete
      case CONSTANTS.DELETE_NODE_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_NODE_SUCCESS:
        draft.data.graph.nodes = draft.data.graph.nodes.filter(
          node => node.id !== action.nodeId,
        )
        draft.data.graph.dependencies = draft.data.graph.dependencies.filter(
          dependency =>
            !(
              dependency.sourceId === action.nodeId ||
              dependency.targetId === action.nodeId
            ),
        )
        draft.loading = false
        break
      case CONSTANTS.DELETE_NODE_FAILURE:
        draft.loading = false
        break

      // dependency creation
      case CONSTANTS.CREATE_DEPENDENCY_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.CREATE_DEPENDENCY_SUCCESS:
        draft.data.graph.dependencies.map(dependency => {
          if (
            dependency.sourceId === action.dependency.source &&
            dependency.targetId === action.dependency.target
          ) {
            return {
              ...action.dependency,
              sourceId: action.dependency.source,
              targetId: action.dependency.target,
            }
          }
          draft.data.graph.dependencies.push({
            ...action.dependency,
            sourceId: action.dependency.source,
            targetId: action.dependency.target,
          })
        })
        draft.data.link = {
          ...action.dependency,
          sourceId: action.dependency.source,
          targetId: action.dependency.target,
        }
        draft.loading = false
        break
      case CONSTANTS.CREATE_DEPENDENCY_FAILURE:
        draft.loading = false
        break

      // dependency update
      case CONSTANTS.UPDATE_DEPENDENCY_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.UPDATE_DEPENDENCY_SUCCESS:
        draft.data.graph.dependencies = draft.data.graph.dependencies.map(
          dependency =>
            dependency.id === action.dependency.id
              ? action.dependency
              : dependency,
        )
        draft.data.link = {
          ...action.dependency,
          id: action.dependency.source + action.dependency.target,
        }
        draft.loading = false
        break
      case CONSTANTS.UPDATE_DEPENDENCY_FAILURE:
        draft.loading = false
        break

      // dependency delete
      case CONSTANTS.DELETE_DEPENDENCY_REQUEST:
        draft.loading = true
        break
      case CONSTANTS.DELETE_DEPENDENCY_SUCCESS:
        draft.data.graph.dependencies = draft.data.graph.dependencies.filter(
          dependency => dependency.id !== action.dependencyId,
        )
        draft.data.link = { weight: 0 }
        draft.loading = false
        break
      case CONSTANTS.DELETE_DEPENDENCY_FAILURE:
        draft.loading = false
        break

      // simulation
      case CONSTANTS.LOAD_SIMULATED_GRAPH:
        draft.data.simulatedGraph = action.graph
        break
      case CONSTANTS.UPDATE_SIMULATION_NODE:
        draft.data.simulatedGraph.nodes = draft.data.simulatedGraph.nodes.map(
          node =>
            node.id === action.nodeId
              ? {
                ...node,
                  type: 6,
                  originalType:
                    node.originalType !== undefined
                      ? node.originalType
                      : node.type,
                }
              : node,
        )
        break
      case CONSTANTS.RESET_SIMULATION:
        draft.data.simulatedGraph.nodes = draft.data.simulatedGraph.nodes.map(
          node => ({
            ...node,
            type:
              node.originalType !== undefined ? node.originalType : node.type,
          }),
        )
        break
      case CONSTANTS.FINISH_SIMULATION:
        draft.data.simulatedGraph.nodes = draft.data.simulatedGraph.nodes.map(
          node => ({
            ...node,
            type: 6,
            originalType:
              node.originalType !== undefined ? node.originalType : node.type,
          }),
        )
        break

      // operations
      case CONSTANTS.APPLY_PBRO_SUCCESS:
      case CONSTANTS.APPLY_REVERSE_PBRO_SUCCESS:
        draft.data.graph.dependencies = draft.data.graph.dependencies.filter(
          dependency =>
            !action.data.deleted.find(
              d =>
                d.source === dependency.source &&
                d.target === dependency.target,
            ),
        )
        draft.data.graph.dependencies.push(
          ...action.data.created.map(d => ({
            ...d,
            sourceId: d.source,
            targetId: d.target,
          })),
        )
        draft.data.graph.dependencies = draft.data.graph.dependencies.map(
          dependency => {
            const newDependency = action.data.updated.find(
              d =>
                d.source === dependency.source &&
                d.target === dependency.target,
            )
            if (newDependency) {
              return {
                ...newDependency,
                sourceId: newDependency.source,
                targetId: newDependency.target,
              }
            }
            return dependency
          },
        )
        break

      case CONSTANTS.MAGNIFY_SUCCESS:
        draft.data.graph.dependencies = draft.data.graph.dependencies.map(
          dependency => {
            const newDependency = action.data.find(
              d =>
                d.source === dependency.source &&
                d.target === dependency.target,
            )
            if (newDependency) {
              return {
                ...newDependency,
                sourceId: newDependency.source,
                targetId: newDependency.target,
              }
            }
            return dependency
          },
        )
        break
      case LIVESHARE_CONSTANTS.LIVESHARE_LINK_OPERATION_RECEIVED_SUCCESS:
        filteredDependencies = draft.data.graph.dependencies.filter(
          e => e.source !== action.sourceId || e.target !== action.targetId,
        )
        if (action.operationType === LIVESHARE_COMMANDS.LinkCreated)
          draft.data.graph.dependencies = [
            ...filteredDependencies,
            {
              source: action.sourceId,
              target: action.targetId,
              sourceId: action.sourceId,
              targetId: action.targetId,
              weight: action.weight,
            },
          ]
        else if (action.operationType === LIVESHARE_COMMANDS.LinkDeleted)
          draft.data.graph.dependencies = filteredDependencies
        else {
          let existingDependencies = draft.data.graph.dependencies.filter(
            e => e.source === action.sourceId && e.target === action.targetId,
          )
          existingDependencies = existingDependencies.map(e => {
            e.source = action.sourceId
            e.target = action.targetId
            e.sourceId = action.sourceId
            e.targetId = action.targetId
            e.weight = action.weight
            return e
          })
          draft.data.graph.dependencies = [
            ...filteredDependencies,
            ...existingDependencies,
          ]
        }

        break
      case LIVESHARE_CONSTANTS.LIVESHARE_NODE_OPERATION_RECEIVED_SUCCESS:
        filteredNodes = draft.data.graph.nodes.filter(e => e.id !== action.id)
        if (action.operationType === LIVESHARE_COMMANDS.NodeCreated)
          draft.data.graph.nodes = [
            ...filteredNodes,
            { id: action.id, name: action.name, type: action.nodeType },
          ]
        else if (action.operationType === LIVESHARE_COMMANDS.NodeDeleted)
          draft.data.graph.nodes = filteredNodes
        else {
          let existingNodes = draft.data.graph.nodes.filter(
            e => e.id === action.id,
          )
          existingNodes = existingNodes.map(e => {
            e.id = action.id
            e.name = action.name
            e.type = action.nodeType
            return e
          })
          draft.data.graph.nodes = [...filteredNodes, ...existingNodes]
        }
        break

      case CONSTANTS.UPDATE_TRACK_FILTER_SUCCESS:
        action.trackIds.forEach(trackId => {
          newTrackFilters.push(
            draft.data.graph.nodes.find(node => node.id === trackId),
          )
        })
        draft.data.trackFilters = newTrackFilters
        localStorage.setItem('trackFilters', JSON.stringify(newTrackFilters))
        break
      case CONSTANTS.UPDATE_NODE_FILTER_SUCCESS:
        action.nodeIds.forEach(nodeId => {
          newNodeFilters.push(
            draft.data.graph.nodes.find(node => node.id === nodeId),
          )
        })
        draft.data.nodeFilters = newNodeFilters
        localStorage.setItem('nodeFilters', JSON.stringify(newNodeFilters))
        break
      case CONSTANTS.CLEAR_REDUCER_SUCCESS:
        draft.data = {
          ...initialState.data,
          simulatedGraph: {},
          isSimulating: false,
          selectedNode: {},
          previousNode: {},
          link: { weight: 0 },
          showModal: false,
        }
        break
    }
  })

export default graphnosReducer
