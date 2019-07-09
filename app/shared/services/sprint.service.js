import axios from 'axios'
import { requestHeader } from 'shared/utils/requestHeader'
import URL from './constants'

export const fetchSprints = async projectId => {
  const result = await axios.get(
    URL.baseApiUrl + URL.sprint.listByProject(projectId),
    requestHeader(),
  )
  return result.data
}

export const fetchWorkItems = async sprintId => {
  const result = await axios.get(
    URL.baseApiUrl + URL.sprint.getWorkItemsBySprintId(sprintId),
    requestHeader(),
  )
  return result.data
}

export const addSprint = async sprint => {
  const result = await axios.post(
    URL.baseApiUrl + URL.sprint.post,
    sprint,
    requestHeader(),
  )
  return result.data
}

export const addWorkItem = async workItem => {
  const result = await axios.post(
    URL.baseApiUrl + URL.sprint.postWorkItem,
    workItem,
    requestHeader(),
  )
  return result.data
}

export const updateWorkItem = async (workItemId, workItem) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.sprint.getWorkItemById(workItemId),
    workItem,
    requestHeader(),
  )
  return result.data
}

export const updateWorkItemState = async (workItemId, workItem) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.sprint.updateWorkItemStateById(workItemId),
    workItem,
    requestHeader(),
  )
  return result.data
}

export const deleteWorkItem = async workItemId => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.sprint.getWorkItemById(workItemId),
    requestHeader(),
  )
  return result.data
}
