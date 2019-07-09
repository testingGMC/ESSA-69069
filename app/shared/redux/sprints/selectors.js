import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the sprints state domain
 */

const selectSprintsDomain = state => state.sprints || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sprints
 */

const makeSelectSprints = () =>
  createSelector(
    selectSprintsDomain,
    substate => substate,
  )
const getSelectedSprintId = () =>
  createSelector(
    selectSprintsDomain,
    substate => substate.selectedSprintId,
  )

const getErrors = () =>
  createSelector(
    selectSprintsDomain,
    substate => substate.errors || [],
  )

export default makeSelectSprints
export { selectSprintsDomain, getSelectedSprintId, getErrors }
