import { createSelector } from 'reselect'
import { initialState } from './reducer'

/**
 * Direct selector to the projects state domain
 */

const selectProjectsDomain = state => state.projects || initialState


const makeSelectProjects = () =>
  createSelector(
    selectProjectsDomain,
    substate => {
      if (!substate.data) {
        return substate
      }
      return {
        ...substate,
        data: substate.data.map((s, index) => ({
          ...s,
          key: index,
        })),
      }
    },
  )

export default makeSelectProjects
export { selectProjectsDomain }
