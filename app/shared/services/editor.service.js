import axios from 'axios'
import { requestHeader } from 'shared/utils/requestHeader'
import URL from './constants'

export const fetchTemplates = async () => {
  const result = await axios.get(
    URL.baseApiUrl + URL.editor.getTemplates(),
    requestHeader(),
  )
  return result.data
}

export const getTemplate = async templateId => {
  const result = await axios.get(
    URL.baseApiUrl + URL.editor.getTemplate(templateId),
    requestHeader(),
  )
  return result.data
}

export const addTemplate = async template => {
  const result = await axios.post(
    URL.baseApiUrl + URL.editor.postTemplate,
    template,
    requestHeader(),
  )
  return result.data
}

export const updateTemplate = async (template, templateId) => {
  const result = await axios.put(
    URL.baseApiUrl + URL.editor.updateTemplate(templateId),
    template,
    requestHeader(),
  )
  return result.data
}

export const deleteTemplate = async templateId => {
  const result = await axios.delete(
    URL.baseApiUrl + URL.editor.deleteTemplate(templateId),
    requestHeader(),
  )
  return result.data
}
