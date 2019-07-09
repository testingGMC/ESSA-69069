import {
  LEARNING_STYLE,
  PAGE,
  ASSESSMENT_ELEMENT,
  KEYWORD,
} from './editorConstants'
const PREFIXES = {
  [LEARNING_STYLE]: { prefix: 'co_' },
  [PAGE]: { prefix: 'pa_' },
  [ASSESSMENT_ELEMENT]: { prefix: 'as_' },
  [KEYWORD]: { prefix: 'ke_' },
}

const getKeyPrefix = type => PREFIXES[type].prefix
export const createKey = (uuid, type) => getKeyPrefix(type) + uuid

export const checkType = (key, type) => key.startsWith(getKeyPrefix(type))
