import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the graphnos state domain
 */

const selectGraphnosDomain = state => state.graphnos || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Graphnos
 */

const makeSelectGraphnos = () =>
  createSelector(
    selectGraphnosDomain,
    substate => substate,
  )

export default makeSelectGraphnos
export { selectGraphnosDomain }
