import { clone } from 'lodash'
export const unflattenArray = (oldArray, size) => {
  const newArray = []
  const arrayToTreated = clone(oldArray)
  while (arrayToTreated.length > 0)
    newArray.push(arrayToTreated.splice(0, size))
  return newArray
}

export const isFirstIndex = index => index === 0