import axios from 'axios'
import { requestHeader } from 'shared/utils/requestHeader'
import URL from './constants'

export const fetchIssues = async () => {
  const result = await axios.get(
    URL.baseApiUrl + URL.issue.list,
    requestHeader(),
  )
  return result.data
}

export const updateIssue = async (issueId, issue) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.issue.get(issueId),
    issue,
    requestHeader(),
  )
  return result.data
}
