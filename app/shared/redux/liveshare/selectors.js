import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the liveShare state domain
 */

const selectLiveShareDomain = state => state.liveshare || initialState

/**
 * Other specific selectors
 */

/**
 * Default selector used by LiveShare
 */

const makeSelectLiveShare = () =>
  createSelector(
    selectLiveShareDomain,
    substate => substate,
  )

  const getInstanceCollaborators = () =>
  createSelector(
    selectLiveShareDomain,
    substate => substate.instance !== undefined && substate.instance !== null ? substate.instance.collaborators : null,
  )
  const getInstantMessages = () =>
  createSelector(
    selectLiveShareDomain,
    substate => substate.instance !== undefined && substate.instance !== null ? substate.instance.messages : null,
  )

  const getConnection = () =>
  createSelector(
    selectLiveShareDomain,
    substate => substate.connection,
  )
  const getConnected = () =>
  createSelector(
    selectLiveShareDomain,
    substate => substate.connected,
  )
  const getConnectionStatus = () =>
  createSelector(
    selectLiveShareDomain,
    substate => substate.connectionStatus,
  )
export default makeSelectLiveShare
export { selectLiveShareDomain, getInstanceCollaborators, getConnection, getInstantMessages, getConnected, getConnectionStatus }
