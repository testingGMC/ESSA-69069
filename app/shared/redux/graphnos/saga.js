import { takeEvery, all, put, call } from 'redux-saga/effects'
import { push } from 'connected-react-router'
import { v4 } from 'uuid'
import * as api from 'shared/services/graphnos.service'
import routes from 'shared/routes'
import { NODE_TYPES } from 'shared/constants'
import * as CONSTANTS from './constants'

const delay = ms => new Promise(res => setTimeout(res, ms))

export function* fetchGraph(/* action */) {
  try {
    const result = yield call(api.getKryptonGraph)

    const { model } = result
    const nodes = model.tracks.map(track => ({
      ...track,
      type: NODE_TYPES.track,
    }))
    nodes.push(...model.skills)
    nodes.push(
      ...model.checkpoints.map(checkpoint => ({
        ...checkpoint,
        type: NODE_TYPES.checkpoint,
      })),
    )
    nodes.push(
      ...model.rewards.map(reward => ({ ...reward, type: NODE_TYPES.reward })),
    )
    nodes.push(
      ...model.workshops.map(workshop => ({
        ...workshop,
        type: NODE_TYPES.workshop,
      })),
    )
    let dependencies = model.dependencies.map(d => ({
      ...d,
      sourceId: d.source,
      targetId: d.target,
    }))
    dependencies.push(
      ...model.triggers.map(t => ({
        ...t,
        sourceId: t.source,
        targetId: t.target,
      })),
    )
    dependencies.push(
      ...model.unlocks.map(u => ({
        ...u,
        sourceId: u.source,
        targetId: u.target,
      })),
    )
    dependencies = dependencies.map(d => ({
      ...d,
      id: d.sourceId + d.targetId,
    }))
    const graph = {
      nodes,
      dependencies,
    }
    yield put({
      type: CONSTANTS.FETCH_GRAPH_SUCCESS,
      graph,
    })
  } catch (e) {
    yield put({ type: CONSTANTS.FETCH_GRAPH_FAILURE })
  }
}

export function* fetchGraphWatcher() {
  yield takeEvery(CONSTANTS.FETCH_GRAPH_REQUEST, fetchGraph)
}

export function* createNode(action) {
  try {
    let data
    switch (Number(action.node.type)) {
      case NODE_TYPES.skill:
      case NODE_TYPES.superSkill:
        data = yield call(api.createSkill, action.node)
        break
      case NODE_TYPES.track:
        data = yield call(api.createTrack, action.node)
        break
      case NODE_TYPES.checkpoint:
        data = yield call(api.createCheckpoint, action.node)
        break
      case NODE_TYPES.reward:
        data = yield call(api.createReward, action.node)
        break
      case NODE_TYPES.workshop:
        data = yield call(api.createWorkshop, action.node)
        break
      default:
        break
    }
    yield put({
      type: CONSTANTS.CREATE_NODE_SUCCESS,
      node: { ...data.model, type: action.node.type },
    })
    return data
  } catch (e) {
    yield put({
      type: CONSTANTS.CREATE_NODE_FAILURE,
      e,
    })
  }
}

export function* createNodeWatcher() {
  yield takeEvery(CONSTANTS.CREATE_NODE_REQUEST, createNode)
}

export function* updateNode(action) {
  try {
    let data
    switch (Number(action.node.type)) {
      case NODE_TYPES.skill:
      case NODE_TYPES.superSkill:
        data = yield call(api.updateSkill, action.id, action.node)
        break
      case NODE_TYPES.track:
        data = yield call(api.updateTrack, action.id, action.node)
        break
      case NODE_TYPES.checkpoint:
        data = yield call(api.updateCheckpoint, action.id, action.node)
        break
      case NODE_TYPES.reward:
        data = yield call(api.updateReward, action.id, action.node)
        break
      case NODE_TYPES.workshop:
        data = yield call(api.updateWorkshop, action.id, action.node)
        break
      default:
        break
    }
    yield put({
      type: CONSTANTS.UPDATE_NODE_SUCCESS,
      node: { ...data.model, type: action.node.type },
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_NODE_FAILURE,
      e,
    })
  }
}

export function* updateNodeWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_NODE_REQUEST, updateNode)
}

export function* deleteNode(action) {
  try {
    switch (action.nodeType) {
      case NODE_TYPES.skill:
      case NODE_TYPES.superSkill:
        yield call(api.deleteSkill, action.nodeId)
        break
      case NODE_TYPES.track:
        yield call(api.deleteTrack, action.nodeId)
        break
      case NODE_TYPES.checkpoint:
        yield call(api.deleteCheckpoint, action.nodeId)
        break
      case NODE_TYPES.reward:
        yield call(api.deleteReward, action.nodeId)
        break
      case NODE_TYPES.workshop:
        yield call(api.deleteWorkshop, action.nodeId)
        break
      default:
        break
    }
    yield put({
      type: CONSTANTS.DELETE_NODE_SUCCESS,
      nodeId: action.nodeId,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_NODE_FAILURE,
      e,
    })
  }
}

export function* deleteNodeWatcher() {
  yield takeEvery(CONSTANTS.DELETE_NODE_REQUEST, deleteNode)
}

const dependenciesCreationMap = {
  // concat of source and target types
  '03': api.createOrUpdateSkillToCheckpointDependency,
  '04': api.createOrUpdateSkillToRewardDependency,
  '00': api.createOrUpdateSkillToSkillDependency,
  '01': api.createOrUpdateSkillToSkillDependency,
  '10': api.createOrUpdateSkillToSkillDependency,
  '11': api.createOrUpdateSkillToSkillDependency,
  '05': api.createOrUpdateSkillToWorkshopDependency,
  '20': api.createOrUpdateTrackToSkillDependency,
  '21': api.createOrUpdateTrackToSkillDependency,
}

export function* createOrUpdateDependency(action) {
  try {
    const dependencyKey = `${action.source.type}${action.target.type}`
    if (dependenciesCreationMap[dependencyKey]) {
      const result = yield call(
        dependenciesCreationMap[dependencyKey],
        action.source.id,
        action.target.id,
        action.weight,
      )
      yield put({
        type: CONSTANTS.CREATE_DEPENDENCY_SUCCESS,
        dependency: result.model,
      })
    } else {
      // implement action
    }
  } catch (e) {
    yield put({
      type: CONSTANTS.CREATE_DEPENDENCY_FAILURE,
      e,
    })
  }
}

export function* createOrUpdateDependencyWatcher() {
  yield takeEvery(CONSTANTS.CREATE_DEPENDENCY_REQUEST, createOrUpdateDependency)
}

export function* updateDependency(action) {
  try {
    yield delay(1000)
    yield put({
      type: CONSTANTS.UPDATE_DEPENDENCY_SUCCESS,
      dependency: { ...action.dependency, id: v4() },
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_DEPENDENCY_FAILURE,
      e,
    })
  }
}

export function* updateDependencyWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_DEPENDENCY_REQUEST, updateDependency)
}

const dependenciesDeleteMap = {
  // concat of source and target types
  '03': api.deleteSkillToCheckpointDependency,
  '04': api.deleteSkillToRewardDependency,
  '00': api.deleteSkillToSkillDependency,
  '01': api.deleteSkillToSkillDependency,
  '10': api.deleteSkillToSkillDependency,
  '11': api.deleteSkillToSkillDependency,
  '05': api.deleteSkillToWorkshopDependency,
  '20': api.deleteTrackToSkillDependency,
  '21': api.deleteTrackToSkillDependency,
}

export function* deleteDependency(action) {
  try {
    const dependencyKey = `${action.source.type}${action.target.type}`
    yield call(
      dependenciesDeleteMap[dependencyKey],
      action.source.id,
      action.target.id,
    )
    yield put({
      type: CONSTANTS.DELETE_DEPENDENCY_SUCCESS,
      dependencyId: action.source.id + action.target.id,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DELETE_DEPENDENCY_FAILURE,
      e,
    })
  }
}

export function* deleteDependencyWatcher() {
  yield takeEvery(CONSTANTS.DELETE_DEPENDENCY_REQUEST, deleteDependency)
}

export function* duplicateNode(action) {
  try {
    const data = yield createNode({ node: action.node })
    yield createOrUpdateDependency({
      target: data.model,
      source: action.source,
      weight: action.weight,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.DUPLICATE_SKILL_FAILURE,
    })
  }
}

export function* duplicateNodeWatcher() {
  yield takeEvery(CONSTANTS.DUPLICATE_SKILL_REQUEST, duplicateNode)
}

export function* applyPBro({
  parentNodeId,
  firstChildNodeId,
  secondChildNodeId,
}) {
  try {
    const data = yield call(
      api.applyPBro,
      parentNodeId,
      firstChildNodeId,
      secondChildNodeId,
    )
    yield put({
      type: CONSTANTS.APPLY_PBRO_SUCCESS,
      data: data.model,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.APPLY_PBRO_FAILURE,
      e,
    })
  }
}

export function* applyPBroWatcher() {
  yield takeEvery(CONSTANTS.APPLY_PBRO_REQUEST, applyPBro)
}

export function* applyReversePBro({ sourceId, targetId }) {
  try {
    const data = yield call(api.applyReversePBro, sourceId, targetId)
    yield put({
      type: CONSTANTS.APPLY_REVERSE_PBRO_SUCCESS,
      data: data.model,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.APPLY_REVERSE_PBRO_FAILURE,
      e,
    })
  }
}

export function* applyReversePBroWatcher() {
  yield takeEvery(CONSTANTS.APPLY_REVERSE_PBRO_REQUEST, applyReversePBro)
}

export function* magnify({ nodeId }) {
  try {
    const data = yield call(api.magnify, nodeId)
    yield put({
      type: CONSTANTS.MAGNIFY_SUCCESS,
      data: data.model,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.MAGNIFY_FAILURE,
      e,
    })
  }
}

export function* magnifyWatcher() {
  yield takeEvery(CONSTANTS.MAGNIFY_REQUEST, magnify)
}

export function* redirectToEditor({ nodeId }) {
  yield put(push(routes.EDITOR.linkPath(nodeId)))
}

export function* redirectToEditorWatcher() {
  yield takeEvery(CONSTANTS.REDIRECT_TO_EDITOR, redirectToEditor)
}

export function* updateTrackFilters({ trackIds }) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_TRACK_FILTER_SUCCESS,
      trackIds,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_TRACK_FILTER_FAILURE,
    })
  }
}

export function* updateTrackFiltersWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_TRACK_FILTER_REQUEST, updateTrackFilters)
}

export function* updateNodeFilters({ nodeIds }) {
  try {
    yield put({
      type: CONSTANTS.UPDATE_NODE_FILTER_SUCCESS,
      nodeIds,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.UPDATE_NODE_FILTER_FAILURE,
    })
  }
}

export function* updateNodeFiltersWatcher() {
  yield takeEvery(CONSTANTS.UPDATE_NODE_FILTER_REQUEST, updateNodeFilters)
}

export function* selectNode({ node }) {
  try {
    yield put({
      type: CONSTANTS.SELECT_NODE_SUCCESS,
      node,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SELECT_NODE_FAILURE,
    })
  }
}

export function* selectNodeWatcher() {
  yield takeEvery(CONSTANTS.SELECT_NODE_REQUEST, selectNode)
}

function* setPreviousNode({ node }) {
  try {
    yield put({
      type: CONSTANTS.SET_PREVIOUS_NODE_SUCCESS,
      node,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SET_PREVIOUS_NODE_FAILURE,
    })
  }
}

function* setPreviousNodeWatcher() {
  yield takeEvery(CONSTANTS.SET_PREVIOUS_NODE_REQUEST, setPreviousNode)
}

function* setLink({ link }) {
  try {
    yield put({
      type: CONSTANTS.SET_LINK_SUCCESS,
      link,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SET_LINK_FAILURE,
    })
  }
}

function* setLinkWatcher() {
  yield takeEvery(CONSTANTS.SET_LINK_REQUEST, setLink)
}

function* setShowModal({ isVisible }) {
  try {
    yield put({
      type: CONSTANTS.SET_SHOW_MODAL_SUCCESS,
      isVisible,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.SET_SHOW_MODAL_FAILURE,
    })
  }
}

function* setShowModalWatcher() {
  yield takeEvery(CONSTANTS.SET_SHOW_MODAL_REQUEST, setShowModal)
}

function* clearReducer() {
  try {
    yield put({
      type: CONSTANTS.CLEAR_REDUCER_SUCCESS,
    })
  } catch (e) {
    yield put({
      type: CONSTANTS.CLEAR_REDUCER_FAILURE,
    })
  }
}

function* clearReducerWatcher() {
  yield takeEvery(CONSTANTS.CLEAR_REDUCER_REQUEST, clearReducer)
}

export default function* GraphSaga() {
  yield all([
    fetchGraphWatcher(),
    createNodeWatcher(),
    updateNodeWatcher(),
    deleteNodeWatcher(),
    createOrUpdateDependencyWatcher(),
    updateDependencyWatcher(),
    deleteDependencyWatcher(),
    duplicateNodeWatcher(),
    applyPBroWatcher(),
    applyReversePBroWatcher(),
    magnifyWatcher(),
    redirectToEditorWatcher(),
    updateTrackFiltersWatcher(),
    updateNodeFiltersWatcher(),
    selectNodeWatcher(),
    setPreviousNodeWatcher(),
    setLinkWatcher(),
    setShowModalWatcher(),
    clearReducerWatcher(),
  ])
}
