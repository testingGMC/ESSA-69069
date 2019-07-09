import { isEmpty } from 'lodash'
import { NO_NAME } from 'shared/constants'
export const renderFullName = fullName => {
  if (!isEmpty(fullName)) {
    return fullName
  }
  return NO_NAME
}
