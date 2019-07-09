import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the trees state domain
 */

const selectTreesDomain = state => state.trees || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Trees
 */

const makeSelectTrees = () =>
  createSelector(
    selectTreesDomain,
    substate => substate,
  )

export default makeSelectTrees
export { selectTreesDomain }
