import { checkType } from 'shared/redux/editor/utils/keysPrefixes'
import { isEmpty } from 'lodash'
import {
  LEARNING_STYLE,
  PAGE,
  ASSESSMENT_ELEMENT,
  KEYWORD,
} from './editorConstants'
export const apiToReducer = skill => {
  const resources = JSON.parse(skill.resources)

  const learningStyles = JSON.parse(skill.learningStyles)
  const assessments = JSON.parse(skill.assessments)
  const keywords = JSON.parse(skill.keywords)
  let result = {}
  if (!resources || isEmpty(Object.keys(resources))) {
    result.learningStyles = []
    result.assessments = []
    result.keywords = []
    return result
  }
  result = resources

  if (!learningStyles) {
    result.learningStyles = []
  } else {
    result = { ...result, learningStyles }
  }

  if (!assessments) {
    result.assessments = []
  } else {
    result = { ...result, assessments }
  }

  if (!keywords) {
    result.keywords = []
  } else {
    result = { ...result, keywords }
  }

  return result
}

export const reducerToApi = skill => {
  const resources = {}
  Object.keys(skill.data).forEach(key => {
    if (
      checkType(key, LEARNING_STYLE) ||
      checkType(key, PAGE) ||
      checkType(key, ASSESSMENT_ELEMENT) ||
      checkType(key, KEYWORD)
    ) {
      resources[key] = skill.data[key]
    }
  })

  const { learningStyles } = skill.data
  const { assessments } = skill.data
  const { keywords } = skill.data
  const result = {
    name: skill.data.name,
    description: skill.data.description,
    type: 0,
    resources: JSON.stringify(resources),
    learningStyles: JSON.stringify(learningStyles),
    assessments: JSON.stringify(assessments),
    keywords: JSON.stringify(keywords),
  }
  return result
}
