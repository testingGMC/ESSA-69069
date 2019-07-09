import axios from 'axios'
import { requestHeader } from '../utils/requestHeader'
import URL from './constants'

export const getKryptonGraph = async () => {
  const result = await axios.get(
    URL.baseApiUrl + URL.graphnos.list,
    requestHeader(),
  )
  return result.data
}

// SKILL CRUD

export const createSkill = async skill => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postSkill,
    skill,
    requestHeader(),
  )
  return result.data
}

export const getSkill = async id => {
  const result = await axios.get(
    URL.baseApiUrl + URL.graphnos.getSkill(id),
    requestHeader(),
  )
  return result.data
}

export const updateSkill = async (id, skill) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.graphnos.updateSkill(id),
    skill,
    requestHeader(),
  )
  return result.data
}

export const deleteSkill = async id => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteSkill(id),
    requestHeader(),
  )
  return result.data
}

// TRACK CRUD

export const createTrack = async track => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postTrack,
    track,
    requestHeader(),
  )
  return result.data
}

export const getTrack = async id => {
  const result = await axios.get(
    URL.baseApiUrl + URL.graphnos.getTrack(id),
    requestHeader(),
  )
  return result.data
}

export const updateTrack = async (id, track) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.graphnos.updateTrack(id),
    track,
    requestHeader(),
  )
  return result.data
}

export const deleteTrack = async id => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteTrack(id),
    requestHeader(),
  )
  return result.data
}

// CHECKPOINT CRUD

export const createCheckpoint = async checkpoint => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postCheckpoint,
    checkpoint,
    requestHeader(),
  )
  return result.data
}

export const getCheckpoint = async id => {
  const result = await axios.get(
    URL.baseApiUrl + URL.graphnos.getCheckpoint(id),
    requestHeader(),
  )
  return result.data
}

export const updateCheckpoint = async (id, checkpoint) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.graphnos.updateCheckpoint(id),
    checkpoint,
    requestHeader(),
  )
  return result.data
}

export const deleteCheckpoint = async id => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteCheckpoint(id),
    requestHeader(),
  )
  return result.data
}

// REWARD CRUD

export const createReward = async reward => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postReward,
    reward,
    requestHeader(),
  )
  return result.data
}

export const getReward = async id => {
  const result = await axios.get(
    URL.baseApiUrl + URL.graphnos.getReward(id),
    requestHeader(),
  )
  return result.data
}

export const updateReward = async (id, reward) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.graphnos.updateReward(id),
    reward,
    requestHeader(),
  )
  return result.data
}

export const deleteReward = async id => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteReward(id),
    requestHeader(),
  )
  return result.data
}

// WORKSHOP CRUD

export const createWorkshop = async workshop => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postWorkshop,
    workshop,
    requestHeader(),
  )
  return result.data
}

export const getWorkshop = async id => {
  const result = await axios.get(
    URL.baseApiUrl + URL.graphnos.getWorkshop(id),
    requestHeader(),
  )
  return result.data
}

export const updateWorkshop = async (id, workshop) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.graphnos.updateWorkshop(id),
    workshop,
    requestHeader(),
  )
  return result.data
}

export const deleteWorkshop = async id => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteWorkshop(id),
    requestHeader(),
  )
  return result.data
}

// DEPENDENCY CRUD

// skill to checkpoint

export const createOrUpdateSkillToCheckpointDependency = async (
  skillId,
  checkpointId,
  weight,
) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postSkillToCheckpoint(skillId, checkpointId),
    { weight },
    requestHeader(),
  )
  return result.data
}

export const deleteSkillToCheckpointDependency = async (
  skillId,
  checkpointId,
) => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.postSkillToCheckpoint(skillId, checkpointId),
    requestHeader(),
  )
  return result.data
}

// skill to reward

export const createOrUpdateSkillToRewardDependency = async (
  skillId,
  rewardId,
  weight,
) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postSkillToReward(skillId, rewardId),
    { weight },
    requestHeader(),
  )
  return result.data
}

export const deleteSkillToRewardDependency = async (skillId, rewardId) => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteSkillToReward(skillId, rewardId),
    requestHeader(),
  )
  return result.data
}

// skill to skill
export const createOrUpdateSkillToSkillDependency = async (
  sourceId,
  targetId,
  weight,
) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postSkillToSkill(sourceId, targetId),
    { weight },
    requestHeader(),
  )
  return result.data
}

export const deleteSkillToSkillDependency = async (sourceId, targetId) => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteSkillToSkill(sourceId, targetId),
    requestHeader(),
  )
  return result.data
}

// skill to workshop

export const createOrUpdateSkillToWorkshopDependency = async (
  skillId,
  workshopId,
  weight,
) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postSkillToWorkshop(skillId, workshopId),
    { weight },
    requestHeader(),
  )
  return result.data
}

export const deleteSkillToWorkshopDependency = async (skillId, workshopId) => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.deleteSkillToWorkshop(skillId, workshopId),
    requestHeader(),
  )
  return result.data
}

// track to skill

export const createOrUpdateTrackToSkillDependency = async (
  trackId,
  skillId,
  weight,
) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.postTrackToSkill(trackId, skillId),
    { weight },
    requestHeader(),
  )
  return result.data
}

export const deleteTrackToSkillDependency = async (trackId, skillId) => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.graphnos.postTrackToSkill(trackId, skillId),
    requestHeader(),
  )
  return result.data
}

// transformations

export const applyPBro = async (parentNodeId, firstChildId, secondChildId) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.pBro,
    {
      sourceNode: parentNodeId,
      middleNode: firstChildId,
      targetNode: secondChildId,
    },
    requestHeader(),
  )
  return result.data
}

export const applyReversePBro = async (sourceId, targetId) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.reversePbro,
    {
      sourceNode: sourceId,
      targetNode: targetId,
    },
    requestHeader(),
  )
  return result.data
}

export const magnify = async nodeId => {
  const result = await axios.post(
    URL.baseApiUrl + URL.graphnos.magnify,
    {
      skillId: nodeId,
    },
    requestHeader(),
  )
  return result.data
}
