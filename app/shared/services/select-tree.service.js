import axios from 'axios'
import { requestHeader } from '../utils/requestHeader'
import URL from './constants'

export const createGraphFromTree = async tree => {
  const result = await axios.post(
    URL.baseApiUrl + URL.treeSelect.post,
    {
      root: {
        ...tree[0],
        name: tree[0].title,
      },
    },
    requestHeader(),
  )
  return result
}
