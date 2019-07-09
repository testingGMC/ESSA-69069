import axios from 'axios'
import { requestHeader } from '../utils/requestHeader'
import URL from './constants'

export const getCommits = async () => {
  const result = await axios.get(
    URL.baseApiUrl + URL.versionControl.list,
    requestHeader(),
  )
  return result.data
}

export const getLatestCommits = async () => {
  const result = await axios.get(
    URL.baseApiUrl + URL.versionControl.latestCommits,
    requestHeader(),
  )
  return result.data
}

export const revertToACommit = async (id, message, description) => {
  const result = await axios.post(
    URL.baseApiUrl + URL.versionControl.revert(id),
    { message, description },
    requestHeader(),
  )
  return result.data
}
