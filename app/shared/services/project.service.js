import axios from 'axios'
import { requestHeader } from 'shared/utils/requestHeader'
import URL from './constants'

export const fetchProjects = async () => {
  const result = await axios.get(
    URL.baseApiUrl + URL.project.list,
    requestHeader(),
  )
  return result.data
}

export const fetchProjectById = async projectId => {
  const result = await axios.get(
    URL.baseApiUrl + URL.project.get(projectId),
    requestHeader(),
  )
  return result.data
}

export const addProject = async project => {
  const result = await axios.post(
    URL.baseApiUrl + URL.project.list,
    project,
    requestHeader(),
  )
  return result.data
}

export const updateProject = async (projectId, project) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.project.get(projectId),
    project,
    requestHeader(),
  )
  return result.data
}

export const deleteProject = async projectId => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.project.get(projectId),
    requestHeader(),
  )
  return result.data
}

export const fetchProjectStatsById = async projectId => {
  const result = await axios.get(
    URL.baseApiUrl + URL.project.getStats(projectId),
    requestHeader(),
  )
  return result.data
}

export const fetchMembersByProjectId = async projectId => {
  const result = await axios.get(
    URL.baseApiUrl + URL.project.getMembersByProjectId(projectId),
    requestHeader(),
  )
  return result.data
}

export const fetchMembersByNameOrEmail = async filter => {
  const result = await axios.get(
    URL.baseApiUrl + URL.project.getMembersByNameOrEmail(filter),
    requestHeader(),
  )
  return result.data
}

export const addMemberToProject = async member => {
  const result = await axios.post(
    URL.baseApiUrl + URL.project.postMember,
    member,
    requestHeader(),
  )
  return result.data
}

export const deleteMemberFromProject = async memberId => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.project.deleteMember(memberId),
    requestHeader(),
  )
  return result.data
}
